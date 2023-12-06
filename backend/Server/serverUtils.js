/*
serverUtils.js
This file exports functions that are used by server.js to do most of the heavy lifting for backend operations
This uses mongoInterface to communicate with DB, but the connection is formed in server.js and passed down.
This is so the backend maintains one connection with the DB at all times.
*/

const { queryCountInTimeframe, insertTimestamp } = require("../mongoInterface");

const { OPENING_HOUR, CLOSING_HOUR } = require("../constants.js");

// Retrieves data from ML model is a JSON file format:
// [{timestamp: Date, count: int}, ...]
// converts it to format:
// {0: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  1: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  2: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  ...
//  6: [{time: Date, count: int}, {time: Date, count: int}, ...]}
// takes no parameters
async function predictions() {
  //imports data from json file
  const mlJSON = require("../ML-Stuff/model_predictions.json");

  let dailyData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  // for each date in the input, put it into corresponding day in dailyData map
  // 0: Sunday, 1: Monday, ...
  for(let i = 0; i < mlJSON.length; i++){
    let formattedDate = new Date(mlJSON[i].timestamp);
    let dayOfWeek = formattedDate.getDay();
    if(isGymOpen(formattedDate)){
      const newObject = {time: formattedDate, count: mlJSON[i].count};
      dailyData[dayOfWeek].push(newObject);
    }
  }
  // convert the map into new JSON
  let formattedJSON = [];
  for(let day in dailyData){
    formattedJSON.push({"day": parseInt(day), "data": dailyData[day]});
  }
  
  return formattedJSON;
}

// Queries database for total signins between intervals throughout the day
// granularity parameter (int) dictates the interval. Default = 60 mins
// returns an array of JSON objects with format:
// [{time: Date, count: int}, {time: Date, count: int}, ...]
// Takes day (Date) parameter
async function signinsOfDay(connection, day, granularity) {
  
  // setup times for iterator
  // times are checked between checkTime and nextTime
  const openHour = OPENING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour, 0, 0, 0);
  const curTime = new Date();
  let nextTime = new Date(checkTime.valueOf());
  incrementMinutes(nextTime, granularity);
  let i = 0;
  let occupancyData = [];
  let occupancyTimes = [];

  //iterate over the intervals, querying how many scan-ins in each
  //puts the count and the time into parallel arrays
  while (checkTime < curTime && isGymOpen(checkTime)) {
    occupancyData[i] = queryCountInTimeframe(connection, checkTime, nextTime);
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(nextTime, granularity);
    incrementMinutes(checkTime, granularity);
  }

  // If it's the current day, fill the most recent interval only with times up until the current minute
  if(checkTime > curTime && isGymOpen(checkTime)){
    incrementMinutes(checkTime, -1 * granularity);
    occupancyData[i] = queryCountInTimeframe(connection, checkTime, curTime);
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, 2 * granularity);
  }
  // if the checktime has not happened yet, fill it in with 0s
  // REMOVE if using live data
  while (isGymOpen(checkTime)) { 
    occupancyData[i] = 0;
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, granularity);
  }

  // await upon all the promises in the occupancyData array to be fulfilled
  occupancyData = await Promise.all(occupancyData);

  // convert parallel arrays to json
  let countjson = [];
  for (i = 0; i < occupancyData.length; i++) {
    let obj = { time: 0, count: 0 };
    obj.time = occupancyTimes[i];
    obj.count = occupancyData[i];
    countjson.push(obj);
  }
  
  return countjson;
}

// Queries database for each day of month
// returns an array of JSON objects with format:
// [{day: Date, count: int}, {day: Date, count: int}, ...]
// takes year (int) and month (int) as parameters
async function signinsOfMonth(connection, year, month) {

  //create date objects for logic
  const date = new Date();
  date.setFullYear(year, month, 1);
  date.setHours(0,0,0,0);
  const nextDate = new Date(date.valueOf());

  // loop through month and query for each day
  // stores counts and dates in seperate parallel arrays
  let signinData = [];
  let dates = [];
  while(date.getMonth() == month){
    // set the hours for the query range as we don't want to read any entries made outside of open hours
    date.setHours(OPENING_HOUR(date.getDay()));
    nextDate.setHours(CLOSING_HOUR(nextDate.getDay()));
    let count = await queryCountInTimeframe(connection, date, nextDate);
    // gets rid of sample data from the future. Remove if using live data
    if(date > new Date()){
      count = 0;
    }
    signinData.push(count);
    dates.push(new Date(date.valueOf()));
    // go to next day
    date.setDate(date.getDate() + 1);
    nextDate.setDate(nextDate.getDate() + 1);
  }

  // wait for all data to load the DB calls were done in parallel
  signinData = await Promise.all(signinData);

  //transform the parallel arrays into JSON objects
  let monthlyJSON = [];
  for(let i = 0; i < signinData.length; i++){
    monthlyJSON.push({day: dates[i], count: signinData[i]});
  }
  return monthlyJSON;
}

// Queries database for occupancy at intervals throughout the day
// granularity parameter (int) dictates the interval. Default = 60 mins
// returns an array of JSON objects with format:
// [{time: Date, count: int}, {time: Date, count: int}, ...]
// Takes day (Date) and stayDuration (int) parameters
async function occupancyOfDay(connection, day, granularity, stayDuration) {
  
  //initialize values for iterator.
  const openHour = OPENING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour, 0, 0, 0);
  let openingTime = new Date(checkTime.valueOf());
  const curTime = new Date();
  let i = 0;
  let occupancyData = [];
  let occupancyTimes = [];

  //Start measuring occupancy an hour after opening, as occupancy at opening should be 0
  incrementMinutes(checkTime, 60);

  //cutoffTime represents the time before which sign-ins are no longer counted for current occupancy
  let cutoffTime = new Date(checkTime.valueOf());
  incrementMinutes(cutoffTime, -1 * stayDuration);

  // iterate over the intervals, querying how many scan-ins in each
  // put the time and the count into parallel arrays
  while (checkTime < curTime && isGymOpen(checkTime)) {
    let minEntryTime = cutoffTime;
    if (cutoffTime < openingTime) {
      minEntryTime = openingTime;
    }
    occupancyData[i] = queryCountInTimeframe(
      connection,
      minEntryTime,
      checkTime
    );
    occupancyTimes[i] = new Date(checkTime.valueOf());
    incrementMinutes(checkTime, granularity);
    incrementMinutes(cutoffTime, granularity);
    i++;
  }

    // If there is still time remaining in the current day, add current occupancy entry for the upcoming hour
  if(checkTime > curTime && isGymOpen(checkTime) && checkTime.toDateString() === curTime.toDateString()){
    occupancyData[i] = currentOccupancy(connection, stayDuration);
    occupancyTimes[i] = new Date(checkTime.valueOf());
    incrementMinutes(checkTime, granularity);
    i++;
    }
    // if the checktime has not happened yet, fill it in with 0s
    // REMOVE if using live data
  while (isGymOpen(checkTime)) {   
    occupancyData[i] = 0;
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, granularity);
  }

  // await upon all the promises in the occupancyData array to be fulfilled
  occupancyData = await Promise.all(occupancyData);

  // convert parallel arrays to json
  let countjson = [];
  for (i = 0; i < occupancyData.length; i++) {
    let obj = { time: 0, count: 0 };
    obj.time = occupancyTimes[i];
    obj.count = occupancyData[i];
    countjson.push(obj);
  }
  return countjson;
}

// Returns the current occupancy of the gym as an int
// takes duration as parameter. 
// Represents time in minutes that someone is expected to stay in the gym.
async function currentOccupancy(connection, duration) {
  let curTime = new Date();
  const openHour = OPENING_HOUR(curTime.getDay());
  // returns 0 if the gym is closed
  if(!isGymOpen(curTime)){
    return 0;
  }
  //cutoffTime dictates the last possible time an entry would be counted for the current occupancy
  let cutoffTime = new Date();
  incrementMinutes(cutoffTime, -1 * duration);

  let openingTime = new Date();
  openingTime.setHours(openHour, 0, 0, 0);

  //if the cutoffTime would lie before the opening time, set it to the opening time instead
  let minEntryTime = cutoffTime;
  if (cutoffTime < openingTime) {
    minEntryTime = openingTime;
  }

  occupancy = queryCountInTimeframe(connection, minEntryTime, curTime);
  return occupancy;
}

// inserts the current time into the database
// isEntry is currently useless
async function insertCurrentTime(connection, isEntry) {
  const curTime = new Date();
  curTime.toISOString();

  result = insertTimestamp(connection, curTime, isEntry);
  return result;
}

// helper function that increments minutes in a Date object
function incrementMinutes(time, minutes) {
  time.setMinutes(time.getMinutes() + minutes);
}

// helper function to determine if the gym would be open on a certain date
// only considers opening and closing hours, not holidays
function isGymOpen(date){
  let hour = date.getHours();
  let dayOfWeek = date.getDay();
  if(hour >= OPENING_HOUR(dayOfWeek) && hour < CLOSING_HOUR(dayOfWeek)){
    return true;
  }
  return false;
}

module.exports = {
  signinsOfDay,
  occupancyOfDay,
  currentOccupancy,
  insertCurrentTime,
  predictions,
  signinsOfMonth
};
