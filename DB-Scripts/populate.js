
require("dotenv").config(); // Load environment variables from .env file

const {populateDay} = require("../populateDay.js");
const { connectDB } = require("./mongoInterface");
const connection = connectDB();

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

populateDay(connection, date);



