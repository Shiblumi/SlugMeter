require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;



function connectDB(){
    client = new MongoClient(uri, {});
    client.connect();
    return client;
}

function disconnectDB(client){
    client.close();
}

// helper function that returns the amount of timestamps in the collection between dates startTime and endTime
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

async function insertTimestamp(client, time, isEntry){

  const doc = {
    timestamp: time,
    isEntry: isEntry,
  };

  const collection = client.db("SlugMeterTest").collection("Times");
  const result = await collection.insertOne(doc);
  return result.acknowledged;
}

async function insertTimestamps(client, docs){

  const collection = client.db("SlugMeterTest").collection("Times");
  const result = await collection.insertMany(docs);
  return result.acknowledged;
}

  module.exports = {
    queryCountInTimeframe,
    insertTimestamp,
    connectDB,
    disconnectDB,
    insertTimestamps
  };