const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const port = 3000;

// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

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
    const responseText =
      "Timestamps from the last hour:\n" + timestamps.join("\n");

    res.send(responseText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
