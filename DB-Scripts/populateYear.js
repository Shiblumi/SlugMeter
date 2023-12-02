const {populateDay} = require("./populateDay.js");
const { connectDB } = require("../mongoInterface");
const connection = connectDB();

let curDate = new Date();
let year = curDate.getFullYear();
console.log("Awaiting response from the DB...")
for(let i = 0; i < 8; i++){
    populateYear(connection, year);
    year-=1;
    
}


function populateYear(connection, year){
    let date = new Date();
    date.setFullYear(year, 11, 31);
    while(date.getFullYear() == year){
        result = populateDay(connection, date);
        date.setDate(date.getDate() - 1);
    }
}