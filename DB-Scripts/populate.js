
require("dotenv").config(); // Load environment variables from .env file

// Setup DB Connection
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

const {OPENING_HOUR, CLOSING_HOUR, HOURLY_WEIGHTS, DAILY_ENTRY_MIN, DAILY_ENTRY_MAX} = require("../constants.js");

const arguments = process.argv.slice(2);
if(arguments.length != 3 && arguments.length != 0){
    console.log("Please enter a valid number of arguments (3 or 0)");
    process.exit(1);
}

let date;

if(arguments.length != 0){
    const year = parseInt(arguments[0]);
    const month = parseInt(arguments[1]);
    const day = parseInt(arguments[2]);

    if(isNaN(year) || isNaN(month) || isNaN(day)){
        console.log("Please enter valid numbers as parameters");
        process.exit(1);
    }

    if(year < 1970){
        console.log("Please enter a valid year (after 1970)");
        process.exit(1);
    }

    if(month < 1 || month > 12){
        console.log("Please enter a valid month (1-12)");
        process.exit(1);
    }

    if(day < 1 || day > 31){
        console.log("Please enter a valid day (1-31)");
        process.exit(1);
    }

    date = new Date(year,month-1,day);
}
else{
    date = new Date();
}

populateDay(date);
//process.exit(0);



// takes a date object as parameter and populates the database with times from that day
function populateDay(day){

    const dayOfWeek = day.getDay();
    const openingHour = OPENING_HOUR(dayOfWeek);
    const closingHour = CLOSING_HOUR(dayOfWeek);

    // generate a list representing hours, holding the accumulation of each weight up until that point
    let sumWeights = []
    let sum = 0;
    for(let hour = openingHour; hour < closingHour; hour++){
        sum += HOURLY_WEIGHTS(hour);
        sumWeights.push(sum);
    }

    // generate a random number of entries between DAILY_ENTRY_MIN and DAILY_ENTRY_MAX
    numEntries = Math.floor(Math.random() * (DAILY_ENTRY_MAX - DAILY_ENTRY_MIN) + DAILY_ENTRY_MIN);

    // generate random weighted times and put them into docs array
    let docs = [];
    for(let i = 0; i < numEntries; i++){
        let randomTimestamp = getRandomTime(day, sumWeights, openingHour);
        docs.push({timestamp: randomTimestamp, isEntry: true});
    }

    writeResult = writeToDB(docs);
    if(writeResult){
        console.log("Insertion successful!\nInserted " + numEntries + " entries");
    }
    else{
        console.log("Insertion failed");
    }
}

// writes an array of documents to the DB
async function writeToDB(docs){
    const result = await collection.insertMany(docs);
    return result.acknowledged;
}

// returns a random date between opening and closing time with hour based on the weight
function getRandomTime(day, sumWeights, openingHour){
    let totalWeight = sumWeights[sumWeights.length-1];
    let randMinute = Math.floor(Math.random() * 60);
    let weightedResult = Math.floor(Math.random() * totalWeight);
    let hour = 0;
    for(let i = 0; i < sumWeights.length; i++){
        if(weightedResult < sumWeights[i]){
            hour = i + openingHour;
            break;
        }
    }
    const newTime = new Date(day.valueOf());
    newTime.setHours(hour, randMinute, 0, 0);
    return new Date(newTime.toISOString());
}