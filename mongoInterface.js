require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

function connect(){
    
    return collection;
}

function disconnect(){
    client.close();
}

// helper function that returns the amount of timestamps in the collection between dates startTime and endTime
// the times are reformatted into new ISO dates so that they use the correct datatype and UTC time to match the DB
async function queryCountInTimeframe(startTime, endTime) {
    const count = await collection.countDocuments({
      timestamp: {
        $gte: new Date(startTime.toISOString()),
        $lte: new Date(endTime.toISOString()),
      },
    });
    return count;
  }

  module.exports = {
    queryCountInTimeframe
  };