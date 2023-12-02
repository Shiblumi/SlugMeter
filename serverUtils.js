require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;



const { queryCountInTimeframe, insertTimestamp } = require("./mongoInterface");

const { OPENING_HOUR, CLOSING_HOUR } = require("./constants.js");

async function timestampsLastHour() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const collection = client.db("SlugMeterTest").collection("Times");

  // Calculate the date and time 1 hour ago
  const currentDate = new Date();
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  // Query your MongoDB collection to get the data
  const data = await collection
    .find({ timestamp: { $gte: oneHourAgo, $lte: currentDate } })
    .toArray();
  // Extract the "timestamp" values and format the response
  const timestamps = data.map((item) => item.timestamp);
  console.log("TIMESTAMPS: " + timestamps);
  return timestamps;
}
async function timestampsByHour() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const collection = client.db("SlugMeterTest").collection("Times");

  // Calculate the date and time for the start of the day
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);

  // Initialize an array to store counts for each hour
  const hourlyCounts = Array.from({ length: 16 }, () => 0);

  // Query the MongoDB collection to get the data
  const data = await collection
    .find({ timestamp: { $gte: startOfDay, $lte: currentDate } })
    .toArray();

  // Count occurrences for each hour
  data.forEach((item) => {
    const hour = item.timestamp.getHours();
    hourlyCounts[hour - 6] += 1;
  });

  // Close the MongoDB connection
  await client.close();

  return hourlyCounts;
}

async function predictions() {
  const mlJSON = require("./ML-Stuff/model_predictions.json");

  let dailyData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  for(let i = 0; i < mlJSON.length; i++){
    let formattedDate = new Date(mlJSON[i].timestamp);
    let dayOfWeek = formattedDate.getDay();
    let hour = formattedDate.getHours();
    if(hour >= OPENING_HOUR(dayOfWeek) && hour < CLOSING_HOUR(dayOfWeek))
    dailyData[dayOfWeek].push({time: formattedDate, count: mlJSON[i].count});
  }
  let formattedJSON = [];
  for(let day in dailyData){
    formattedJSON.push({"day": parseInt(day), "data": dailyData[day]});
  }
  
  return formattedJSON;
}

async function signinsOfDay(connection, day, granularity) {
  const openHour = OPENING_HOUR(day.getDay());
  const closeHour = CLOSING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour, 0, 0, 0);

  //curTime and nextTime are used in iterator
  const curTime = new Date();
  let nextTime = new Date(checkTime.valueOf());
  incrementMinutes(nextTime, granularity);
  let i = 0;
  let occupancyData = [];
  let occupancyTimes = [];

  //iterate over the intervals, querying how many scan-ins in each
  while (checkTime < curTime && checkTime.getHours() < closeHour) {
    occupancyData[i] = queryCountInTimeframe(connection, checkTime, nextTime);
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(nextTime, granularity);
    incrementMinutes(checkTime, granularity);
  }

  if(checkTime > curTime && checkTime.getHours() < closeHour && checkTime.getHours >= openHour){
    incrementMinutes(checkTime, -1 * granularity);
    occupancyData[i] = queryCountInTimeframe(connection, curCheckTime, curTime);
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, 2 * granularity);
  }
  while (checkTime.getHours() < closeHour) { // if the checktime has not happened yet, fill it in with 0s
    occupancyData[i] = 0;
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, granularity);
  }

  // await upon all the promises in the occupancyData array to be fulfilled
  occupancyData = await Promise.all(occupancyData);

  // convert data to json
  let countjson = [];
  for (i = 0; i < occupancyData.length; i++) {
    let obj = { time: 0, count: 0 };
    obj.time = occupancyTimes[i];
    obj.count = occupancyData[i];
    countjson.push(obj);
  }
  
  return countjson;
}

async function signinsOfMonth(connection, year, month) {
  const date = new Date();
  date.setFullYear(year, month, 1);
  date.setHours(0,0,0,0);
  const nextDate = new Date(date.valueOf());

  let signinData = [];
  let dates = [];
  while(date.getMonth() == month){
    date.setHours(OPENING_HOUR(date.getDay()));
    nextDate.setHours(CLOSING_HOUR(nextDate.getDay()));
    const count = await queryCountInTimeframe(connection, date, nextDate);
    signinData.push(count);
    dates.push(new Date(date.valueOf()));
    date.setDate(date.getDate() + 1);
    nextDate.setDate(nextDate.getDate() + 1);
  }

  signinData = await Promise.all(signinData);
  
  let monthlyJSON = [];
  for(let i = 0; i < signinData.length; i++){
    monthlyJSON.push({day: dates[i], count: signinData[i]});
  }

  return monthlyJSON;
}

async function occupancyOfDay(connection, day, granularity, stayDuration) {
  const openHour = OPENING_HOUR(day.getDay());
  const closeHour = CLOSING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour, 0, 0, 0);

  //initialize values for iterator.
  let openingTime = new Date(checkTime.valueOf());
  const curTime = new Date();
  let i = 0;
  let occupancyData = [];
  let occupancyTimes = [];

  //cutoffTime represents the time before which sign-ins are no longer counted for current occupancy
  let cutoffTime = new Date(checkTime.valueOf());
  incrementMinutes(cutoffTime, -1 * stayDuration);

  //iterate over the intervals, querying how many scan-ins in each
  while (checkTime < curTime && checkTime.getHours() < closeHour) {
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

    // add current occupancy entry
  if(checkTime > curTime && checkTime.getHours() < closeHour && checkTime.getHours >= openHour){
    const curCutoffTime = new Date(curTime.valueOf());
    incrementMinutes(curCutoffTime, -1 * stayDuration);
    occupancyData[i] = queryCountInTimeframe(connection, curCutoffTime, curTime);
    occupancyTimes[i] = new Date(curTime.valueOf());
    i++;
    }
  while (checkTime.getHours() < closeHour) {   // if the checktime has not happened yet, fill it in with 0s
    occupancyData[i] = 0;
    occupancyTimes[i] = new Date(checkTime.valueOf());
    i++;
    incrementMinutes(checkTime, granularity);
  }

  // await upon all the promises in the occupancyData array to be fulfilled
  occupancyData = await Promise.all(occupancyData);
  occupancyData.toString();
  //disconnectDB(connection);

  // convert data to json
  let countjson = [];
  for (i = 0; i < occupancyData.length; i++) {
    let obj = { time: 0, count: 0 };
    obj.time = occupancyTimes[i];
    obj.count = occupancyData[i];
    countjson.push(obj);
  }
  return countjson;
}

async function currentOccupancy(connection, duration) {
  let curTime = new Date();
  const openHour = OPENING_HOUR(curTime.getDay());
  const closeHour = CLOSING_HOUR(curTime.getDay());
  if(curTime.getHours() > closeHour || curTime.getHours < openHour){
    return 0;
  }

  let cutoffTime = new Date();
  incrementMinutes(cutoffTime, -1 * duration);

  let openingTime = new Date();
  openingTime.setHours(openHour, 0, 0, 0);

  let minEntryTime = cutoffTime;
  if (cutoffTime < openingTime) {
    minEntryTime = openingTime;
  }
  occupancy = queryCountInTimeframe(connection, minEntryTime, curTime);
  return occupancy;
}

async function insertCurrentTime(connection, isEntry) {
  const curTime = new Date();
  curTime.toISOString();

  result = insertTimestamp(connection, curTime, isEntry);
  return result;
}
/*
// take the occupancy of the current time and put it in last index
cutoffTime.setTime(curTime.valueOf());
incrementMinutes(cutoffTime, -1 * duration);
let minEntryTime = cutoffTime;
if (cutoffTime < openingTime) {
  minEntryTime = openingTime;
}
occupancyData[i] = queryCountInTimeframe(minEntryTime, curTime);
*/

// helper function that increments the date object 'time' by a certain amount of minutes
function incrementMinutes(time, minutes) {
  time.setMinutes(time.getMinutes() + minutes);
}

module.exports = {
  timestampsLastHour,
  timestampsByHour,
  signinsOfDay,
  occupancyOfDay,
  currentOccupancy,
  insertCurrentTime,
  predictions,
  signinsOfMonth
};
