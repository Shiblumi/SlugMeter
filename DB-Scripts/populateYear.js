const {populateDay} = require("./populateDay.js");
const { connectDB } = require("../mongoInterface");
const connection = connectDB();


let curDate = new Date();
let year = curDate.getFullYear();
for(let i = 0; i < 8; i++){
    populateYear(connection, year);
    year-=1;
    
}

function populateYear(connection, year){
    let date = new Date();
    date.setFullYear(year, 11, 31);
    while(date.getFullYear() == year){
        populateDay(connection, date);
        console.log("Completed: " + date.toDateString());
        date.setDate(date.getDate() - 1);
    }
}