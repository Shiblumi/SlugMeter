/*
createIndex.js
creates an index timestamps in database SlugMeterTest collection Times
indexes are used to run lookup functions significantly quicker
Run this file if database was reset or dropped.
code from:
https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/#single-field-indexes
*/

require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

collection.createIndex( { timestamp : -1 }, function(err, result) {
    console.log(result);
    console.log(err);
    callback(result);
 }
);