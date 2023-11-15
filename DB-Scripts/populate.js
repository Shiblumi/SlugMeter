
require("dotenv").config(); // Load environment variables from .env file

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

const {GYM_HOURS, HOURLY_WEIGHTS} = require("../constants.js");

const today = new Date();
const dayOfWeek = today.getDay();

const openingHour = GYM_HOURS.find(({day}) => day === dayOfWeek).openHour;

// generate another list holding the sum of each prior element
let sumWeights = []
let sum = 0;
for(let i = 0; i < HOURLY_WEIGHTS.length; i++){
    sum += HOURLY_WEIGHTS[i].weight;
    sumWeights.push(sum);
}
let totalWeight = sumWeights[sumWeights.length-1];

// generate a random number between 500 and 1500
numEntries = Math.floor(Math.random() * 1000 + 500);

let docs = [];
let randomTimestamp;

for(let i = 0; i < numEntries; i++){
    randomTimestamp = getRandomTime();
    docs.push({timestamp: randomTimestamp, isEntry: true});
}

writeToDB(docs);

async function writeToDB(docs){
    const result = await collection.insertMany(docs);
  
    if(result.acknowledged){
    console.log("Insertion successful!\nInserted " + numEntries + " entries");
    }
    else{
    console.log("Insertion failed");
    }
}

function getRandomTime(){
    let weightedResult = Math.floor(Math.random() * totalWeight);
    let hour = 0;
    for(let i = 0; i < sumWeights.length; i++){
        if(weightedResult < sumWeights[i]){
            hour = i + openingHour;
            break;
        }
    }

    randMinute = Math.floor(Math.random() * 60);

    const newTime = new Date();
    newTime.setHours(hour, randMinute, 0, 0);
    
    return new Date(newTime.toISOString());
}