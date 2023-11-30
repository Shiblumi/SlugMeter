
const {OPENING_HOUR, CLOSING_HOUR, HOURLY_WEIGHTS, DAILY_ENTRY_MIN, DAILY_ENTRY_MAX} = require("../constants.js");

const {insertTimestamps } = require("../mongoInterface");

// takes a date object as parameter and populates the database with times from that day
function populateDay(connection, day){

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

    writeResult = insertTimestamps(connection, docs);
    if(writeResult){
        console.log("Insertion successful!\nInserted " + numEntries + " entries");
    }
    else{
        console.log("Insertion failed");
    }
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

exports.populateDay = populateDay;