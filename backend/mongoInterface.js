/*
mongoInterface.js
requires MONGODB_URI connection string in .env file
interfaces the cloud-hosted mongoDB database
Refers to database name SlugMeterTest and collection name Times
most functions require a client parameter, which can be created by connectDB()
*/

require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;


// forms a connection to the DB a returns it to caller
// this connection is a required parameter for all other interface functions
function connectDB(){
    client = new MongoClient(uri, {});
    client.connect();
    return client;
}

// Closes the client passed as a parameter
function disconnectDB(client){
    client.close();
}

// Returns the count of timestamps in between dates startTime and endTime
// the times are reformatted into new ISO dates so that they use the correct datatype and UTC time to match the DB
async function queryCountInTimeframe(client, startTime, endTime) {
    const collection = client.db("SlugMeterTest").collection("Times");
    const count = await collection.countDocuments({
      timestamp: {
        $gte: new Date(startTime.toISOString()),
        $lte: new Date(endTime.toISOString()),
      },
    });
    return count;
  }

// inserts a new entry to the database
// parameters are time (date) and isEntry (bool)
async function insertTimestamp(client, time, isEntry){
  const doc = {
    timestamp: time,
    isEntry: isEntry,
  };

  const collection = client.db("SlugMeterTest").collection("Times");
  const result = await collection.insertOne(doc);
  return result.acknowledged;
}

// inserts several entries into the database at once
// the docs parameter takes an array of JSON objects
// format: {timestamp: Date, isEntry: bool}
async function insertTimestamps(client, docs){
  const collection = client.db("SlugMeterTest").collection("Times");
  const result = await collection.insertMany(docs);
  return result.insertedCount;
}

  module.exports = {
    queryCountInTimeframe,
    insertTimestamp,
    connectDB,
    disconnectDB,
    insertTimestamps
  };