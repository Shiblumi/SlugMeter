const express = require("express");
const { timestampsLastHour, timestampsByHour } = require("./serverUtils");
const pug = require("pug");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const port = 3000;

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", async (req, res) => {
  try {
    const lastHourTimestamps = await timestampsLastHour();
    const hourlyCounts = await timestampsByHour();

    res.render("chart", { lastHourTimestamps, hourlyCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays sign-ins for each time frame after 'interval' minutes
// Format: /signins/interval=minutes
app.get("/signins/", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");

    //set the timeframe for the chart in the gym operational hours
    const openHour = 6;
    const closeHour = 23;

    //Time interval to display data. In minutes
    const minInterval = 5,
      maxInterval = 600,
      defaultInterval = 60;
    let interval = parseInt(req.query.interval);
    if (isNaN(interval) || interval < minInterval || interval > maxInterval) {
      interval = defaultInterval;
    }

    let responseText =
      "Today's estimated sign-ins sorted by " +
      interval +
      " minute intervals:<br><br>";

    //const year = req.query.year;
    //const month = req.query.month;
    //const day = req.query.day;

    //checkTime is set to gym opening time
    let checkTime = new Date();
    checkTime.setMinutes(0);
    checkTime.setSeconds(0);
    checkTime.setMilliseconds(0);
    checkTime.setHours(openHour);
    //curTime and nextTime are used in iterator
    const curTime = new Date();
    let nextTime = new Date(checkTime.valueOf());
    let i = 0;
    let occupancyData = [];

    //iterate over the intervals, querying how many scan-ins in each
    for (
      ;
      checkTime < curTime && checkTime.getHours() < closeHour;
      incrementMinutes(checkTime, interval)
    ) {
      incrementMinutes(nextTime, interval);
      occupancyData[i] = queryCountInTimeframe(collection, checkTime, nextTime);
      i++;
    }

    // await upon all the promises in the occupancyData array to be fulfilled
    occupancyData = await Promise.all(occupancyData);
    responseText += occupancyData.toString();

    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays estimated occupancy for each time frame after 'interval' minutes
// duration defines for how long an occupant is counted after their sign-in
// Format: /signins/interval=minutes
app.get("/occupancy", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");

    //set the timeframe for the chart in the gym operational hours
    const openHour = 6;
    const closeHour = 23;

    //Time interval to display data. In minutes
    const minInterval = 5,
      maxInterval = 600,
      defaultInterval = 60;
    let interval = parseInt(req.query.interval);
    if (isNaN(interval) || interval < minInterval || interval > maxInterval) {
      interval = defaultInterval;
    }
    //Expected time to stay in gym. In minutes
    const minDuration = 5,
      maxDuration = 720,
      defaultDuration = 90;
    let duration = parseInt(req.query.duration);
    if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
      duration = defaultDuration;
    }

    //const year = req.query.year;
    //const month = req.query.month;
    //const day = req.query.day;

    let responseText =
      "Today's estimated occupancy sorted by " +
      interval +
      " minute intervals:<br><br>";

    const openingTime = new Date();
    openingTime.setMinutes(0);
    openingTime.setSeconds(0);
    openingTime.setMilliseconds(0);
    openingTime.setHours(openHour);

    //initialize values for iterator.
    let checkTime = new Date(openingTime.valueOf());
    const curTime = new Date();
    let i = 0;
    let occupancyData = [];

    //cutoffTime represents the time before which sign-ins are no longer counted for current occupancy
    let cutoffTime = new Date(checkTime.valueOf());
    incrementMinutes(cutoffTime, -1 * duration);

    //iterate over the intervals querying how many scan-ins in each
    for (
      let checkTime = new Date(openingTime.valueOf());
      checkTime < curTime && checkTime.getHours() < closeHour;
      incrementMinutes(checkTime, interval)
    ) {
      let minEntryTime = cutoffTime;
      if (cutoffTime < openingTime) {
        minEntryTime = openingTime;
      }
      occupancyData[i] = queryCountInTimeframe(
        collection,
        minEntryTime,
        checkTime
      );
      incrementMinutes(cutoffTime, interval);
      i++;
    }

    // take the occupancy of the current time and put it in last index
    cutoffTime.setTime(curTime.valueOf());
    incrementMinutes(cutoffTime, -1 * duration);
    let minEntryTime = cutoffTime;
    if (cutoffTime < openingTime) {
      minEntryTime = openingTime;
    }
    occupancyData[i] = queryCountInTimeframe(collection, minEntryTime, curTime);

    // await upon all the promises in the occupancyData array to be fulfilled
    occupancyData = await Promise.all(occupancyData);
    responseText += occupancyData.toString();

    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// helper function that returns the amount of timestamps in the collection between dates startTime and endTime
// the times are reformatted into new ISO dates so that they use the correct datatype and UTC time to match the DB
async function queryCountInTimeframe(collection, startTime, endTime) {
  const count = await collection.countDocuments({
    timestamp: {
      $gte: new Date(startTime.toISOString()),
      $lte: new Date(endTime.toISOString()),
    },
  });
  return count;
}

// helper function that increments the date object 'time' by a certain amount of minutes
function incrementMinutes(time, minutes) {
  time.setMinutes(time.getMinutes() + minutes);
}

// Scan-in Page that will be destionation of QR code. Adds an entry to database at current time.
// responds with whether db update succeeded or failed.
app.get("/scanin", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");

    //get current time and format it
    const curTime = new Date();
    curTime.toISOString();

    //the scan-in page only handles entries.
    const isEntry = true;

    // Create a document to insert
    const doc = {
      timestamp: curTime,
      isEntrance: isEntry,
    };

    const result = await collection.insertOne(doc);

    let responseText;
    if (result.acknowledged) {
      responseText = "Sign in successful!<br>";
    } else {
      responseText = "Sign in failed<br>";
    }
    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
