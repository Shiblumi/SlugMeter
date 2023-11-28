require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

const { queryCountInTimeframe } = require("./mongoInterface");

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

<<<<<<< HEAD
async function signinsOfDay(connection, day, granularity) {
=======
async function signinsOfDay(connection, day, granularity){
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
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

  // if the checktime has not happened yet, fill it in with 0s
  while (checkTime.getHours() < closeHour) {
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

<<<<<<< HEAD
async function occupancyOfDay(connection, day, granularity, stayDuration) {
  const openHour = OPENING_HOUR(day.getDay());
  const closeHour = CLOSING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour, 0, 0, 0);
=======
async function occupancyOfDay(connection, day, granularity, stayDuration){
  const openHour = OPENING_HOUR(day.getDay());
  const closeHour = CLOSING_HOUR(day.getDay());
  let checkTime = new Date(day.valueOf());
  checkTime.setHours(openHour,0,0,0);

>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1

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
<<<<<<< HEAD
    occupancyData[i] = queryCountInTimeframe(
      connection,
      minEntryTime,
      checkTime
    );
=======
    occupancyData[i] = queryCountInTimeframe(connection, minEntryTime, checkTime);
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
    occupancyTimes[i] = new Date(checkTime.valueOf());
    incrementMinutes(checkTime, granularity);
    incrementMinutes(cutoffTime, granularity);
    i++;
  }

  // if the checktime has not happened yet, fill it in with 0s
<<<<<<< HEAD
  while (checkTime.getHours() < closeHour) {
=======
  while(checkTime.getHours() < closeHour){
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
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
<<<<<<< HEAD
  let countjson = [];
  for (i = 0; i < occupancyData.length; i++) {
    let obj = { time: 0, count: 0 };
=======
  let countjson = []
  for(i = 0; i < occupancyData.length; i++){
    let obj = { "time": 0, "count": 0 };
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
    obj.time = occupancyTimes[i];
    obj.count = occupancyData[i];
    countjson.push(obj);
  }
  return countjson;
}

<<<<<<< HEAD
async function currentOccupancy(connection, duration) {
=======
async function currentOccupancy(connection, duration){

>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
  let curTime = new Date();
  let cutoffTime = new Date();
  incrementMinutes(cutoffTime, -1 * duration);

  const openHour = OPENING_HOUR(curTime.getDay());
  let openingTime = new Date();
<<<<<<< HEAD
  openingTime.setHours(openHour, 0, 0, 0);
=======
  openingTime.setHours(openHour,0,0,0);

  
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1

  let minEntryTime = cutoffTime;
  if (cutoffTime < openingTime) {
    minEntryTime = openingTime;
  }
  occupancy = queryCountInTimeframe(connection, minEntryTime, curTime);
  return occupancy;
}

<<<<<<< HEAD
async function insertCurrentTime(connection, isEntry) {
=======
async function insertCurrentTime(connection, isEntry){
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
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
<<<<<<< HEAD
  insertCurrentTime,
=======
  insertCurrentTime
>>>>>>> 71ea6f2954970dd63d9526b7eec157816e81a3d1
};
