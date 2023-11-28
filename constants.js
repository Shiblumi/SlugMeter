const BACKEND_PORT = 3001;

const GYM_HOURS = [
    {day : 0, openHour : 8, closeHour : 20},
    {day : 1, openHour : 6, closeHour : 23},
    {day : 2, openHour : 6, closeHour : 23},
    {day : 3, openHour : 6, closeHour : 23},
    {day : 4, openHour : 6, closeHour : 23},
    {day : 5, openHour : 6, closeHour : 22},
    {day : 6, openHour : 8, closeHour : 20}
];

function OPENING_HOUR(dayToFind){
    return GYM_HOURS.find(({day}) => day === dayToFind).openHour;
}

function CLOSING_HOUR(dayToFind){
    return GYM_HOURS.find(({day}) => day === dayToFind).closeHour;
}

// Weights assigned to hours to manipulate randomly generated times in example entry data.
// Used in populate.js
const HOURLY_WEIGHTS_LIST = [
    {hour : 6, weight : 3},
    {hour : 7, weight : 2},
    {hour : 8, weight : 3},
    {hour : 9, weight : 4},
    {hour : 10, weight : 4},
    {hour : 11, weight : 6},
    {hour : 12, weight : 7},
    {hour : 13, weight : 7},
    {hour : 14, weight : 5},
    {hour : 15, weight : 6},
    {hour : 16, weight : 5},
    {hour : 17, weight : 7},
    {hour : 18, weight : 7},
    {hour : 19, weight : 9},
    {hour : 20, weight : 10},
    {hour : 21, weight : 5},
    {hour : 22, weight : 3},
];

function HOURLY_WEIGHTS(hourToFind){
    return HOURLY_WEIGHTS_LIST.find(({hour}) => hour === hourToFind).weight;
}

// Used to generate a range of example entry data in populate.js 
const DAILY_ENTRY_MIN = 1000;
const DAILY_ENTRY_MAX = 2000;

exports.BACKEND_PORT = BACKEND_PORT;
exports.DAILY_ENTRY_MIN = DAILY_ENTRY_MIN;
exports.DAILY_ENTRY_MAX = DAILY_ENTRY_MAX;
exports.OPENING_HOUR = OPENING_HOUR;
exports.CLOSING_HOUR = CLOSING_HOUR;
exports.HOURLY_WEIGHTS = HOURLY_WEIGHTS;