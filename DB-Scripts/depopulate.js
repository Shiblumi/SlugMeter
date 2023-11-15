require("dotenv").config(); // Load environment variables from .env file

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

let dayStart = new Date();
dayStart.setHours(0,0,0,0);
let dayEnd = new Date();
dayEnd.setHours(0,0,0,0);
dayEnd.setHours(24);

deleteDay(dayStart, dayEnd);

async function deleteDay(dayStart, dayEnd){
    const result = await collection
        .deleteMany({ timestamp: { $gte: new Date(dayStart.toISOString()), $lte: new Date(dayEnd.toISOString()) } });
    console.log("Deleted " + result.deletedCount  + " documents");
    return result;
}