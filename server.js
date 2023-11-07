const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const port = 3000;

// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

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

app.get("/signins", async (req, res) => {
  try {
    const client = new MongoClient(uri, {});
    await client.connect();
    const collection = client.db("SlugMeterTest").collection("Times");
    
    let responseText = "Today's sign ins sorted by hour:<br><br>"


    //set the timeframe for the chart in the gym operational hours
    const openHour = 6;
    const closeHour = 23;
    //get values for a timestamp on the hour
    let hour = new Date();
    hour.setMinutes(0);
    hour.setSeconds(0);
    hour.setMilliseconds(0);
    let nextHour = new Date(hour.valueOf());
    //iterate over the hours querying how many scan-ins in each
    for(let i = openHour; i < closeHour; i++){
      hour.setHours(i);
      nextHour.setHours(i+1);
      const hourOccupancyData = await collection
        .countDocuments({ timestamp: { $gte: hour, $lte: nextHour } });
      responseText += i + ":00 ";
      //Adds a special html character that allows for 2 consecutive spaces
      if(i<10){responseText += "&nbsp;";}
      responseText += " : " + hourOccupancyData + "<br>";
    }

    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/occupancy", async (req, res) => {
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
    const interval = 15;
    let responseText = "Today's estimated occupancy sorted by " + interval + " minute intervals:<br><br>"
    //get values for a timestamp on the hour
    let checkTime = new Date();
    checkTime.setMinutes(0);
    checkTime.setSeconds(0);
    checkTime.setMilliseconds(0);
    checkTime.setHours(openHour);
    const curTime = new Date();
    let cutoffTime = new Date();

    //iterate over the intervals querying how many scan-ins in each
    for(; checkTime < curTime; checkTime.setMinutes(checkTime.getMinutes() + interval)){

      cutoffTime.setHours(checkTime.getMinutes()-expectedDuration);
      const hourOccupancyData = await queryCountInTimeframe(collection, cutoffTime, checkTime);
      responseText += checkTime.toTimeString() + " : " + hourOccupancyData + "<br>";
    }

    cutoffTime.setHours(curTime.getMinutes()-expectedDuration);
    const hourOccupancyData = await queryCountInTimeframe(collection, cutoffTime, curTime);
    responseText += curTime.toTimeString() + " : " + hourOccupancyData + "<br>";


    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
