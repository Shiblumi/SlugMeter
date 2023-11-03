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

    // Query your MongoDB collection to get the data
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
