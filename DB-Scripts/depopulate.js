require("dotenv").config(); // Load environment variables from .env file

// setup DB connection
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {});
client.connect();
const collection = client.db("SlugMeterTest").collection("Times");

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

depopulateDay(date);
process.exitCode = 0; 

function depopulateDay(day){
    // initialize dates for range at start and end of day
    let dayStart = new Date(day.valueOf());
    dayStart.setHours(0,0,0,0);
    let dayEnd = new Date(day.valueOf());
    dayEnd.setHours(0,0,0,0);
    dayEnd.setHours(24);

    removeDatesInRange(dayStart, dayEnd);
}



// deletes all timestamps in range
async function removeDatesInRange(dayStart, dayEnd){
    const result = await collection
        .deleteMany({ timestamp: { $gte: new Date(dayStart.toISOString()), $lte: new Date(dayEnd.toISOString()) } });
    console.log("Deleted " + result.deletedCount  + " documents");
}