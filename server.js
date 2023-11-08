const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const port = 3000;

// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

// returns the amount of timestamps in the collection between dates startTime and endTime
async function queryCountInTimeframe(collection, startTime, endTime){
  const count = await collection
        .countDocuments({ timestamp: { $gte: startTime, $lte: endTime } });
  return count;
}

app.get("/", async (req, res) => {
  try {
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


    // Create a plain text response
    let responseText =
      "Timestamps from the last hour:\n" + timestamps.join("\n");


    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Page that displays sign-ins for each time frame after 'interval' minutes
// Format: /signins/interval=minutes
app.get("/signins/interval=:listInterval(\\d+)", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");
    
    //Time interval to display data. In minutes
    const interval = parseInt(req.params['listInterval']);
    let responseText = "Today's sign ins sorted by " + interval + " minute intervals:<br><br>"
    //set the timeframe for the chart in the gym operational hours
    const openHour = 6;
    const closeHour = 23;
    //checkTime is set to gym opening time
    let checkTime = new Date();
    checkTime.setMinutes(0);
    checkTime.setSeconds(0);
    checkTime.setMilliseconds(0);
    checkTime.setHours(openHour);
    //curTime and nextTime are used in iterator
    const curTime = new Date();
    let nextTime = new Date(checkTime.valueOf());

    //iterate over the intervals, querying how many scan-ins in each
    for(; checkTime < curTime && checkTime.getHours() < closeHour; checkTime.setMinutes(checkTime.getMinutes() + interval)){
      nextTime.setMinutes(nextTime.getMinutes() + interval);
      const hourOccupancyData = await queryCountInTimeframe(collection, checkTime, nextTime);
      responseText += checkTime.toTimeString() + " : " + hourOccupancyData + "<br>";
    }

    res.send(responseText);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Page that displays estimated occupancy for each time frame after 'interval' minutes
// expectedDuration defines for how long an occupant is counted after their sign-in
// Format: /signins/interval=minutes
app.get("/occupancy/interval=:listInterval(\\d+)", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");
    
    //set the timeframe for the chart in the gym operational hours
    const openHour = 6;
    const closeHour = 23;
    //expected time to stay in gym. In minutes
    const expectedDuration = 90;
    //Time interval to display data. In minutes
    const interval = parseInt(req.params['listInterval']);
    let responseText = "Today's estimated occupancy sorted by " + interval + " minute intervals:<br><br>"
    //checkTime is set to gym opening time
    let checkTime = new Date();
    checkTime.setMinutes(0);
    checkTime.setSeconds(0);
    checkTime.setMilliseconds(0);
    checkTime.setHours(openHour);
    //curTime and cutoffTime are used in iterator.
    //cutoffTime represents the time before which sign-ins are no longer counted for current occupancy 
    const curTime = new Date();
    let cutoffTime = new Date(checkTime.valueOf())

    //iterate over the intervals querying how many scan-ins in each
    for(; checkTime < curTime && checkTime.getHours() < closeHour; checkTime.setMinutes(checkTime.getMinutes() + interval)){
      cutoffTime.setMinutes(checkTime.getMinutes()-expectedDuration);
      const hourOccupancyData = await queryCountInTimeframe(collection, cutoffTime, checkTime);
      responseText += checkTime.toTimeString() + " : " + hourOccupancyData + "<br>";
    }
    cutoffTime.setMinutes(curTime.getMinutes()-expectedDuration);
    const hourOccupancyData = await queryCountInTimeframe(collection, cutoffTime, curTime);
    responseText += curTime.toTimeString() + " : " + hourOccupancyData + "<br>";

    res.send(responseText);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


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
    }

    const result = await collection.insertOne(doc);

    let responseText;
    if(result.acknowledged){
      responseText = "Sign in successful!<br>";
    }
    else{
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
