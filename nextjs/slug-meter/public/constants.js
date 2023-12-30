/*
constants.js
stores constants for use by backend and DB-Scripts
*/

// port to run server.js on
const BACKEND_PORT = 3001;

// map of day (0-6) to opening and closing hours
const GYM_HOURS = [
    {day : 0, openHour : 8, closeHour : 20},
    {day : 1, openHour : 6, closeHour : 23},
    {day : 2, openHour : 6, closeHour : 23},
    {day : 3, openHour : 6, closeHour : 23},
    {day : 4, openHour : 6, closeHour : 23},
    {day : 5, openHour : 6, closeHour : 22},
    {day : 6, openHour : 8, closeHour : 20}
];

// returns opening hour of gym on parameter dayToFind (int)
// 0: Sunday, 1: Monday, ...
function OPENING_HOUR(dayToFind){
    return GYM_HOURS.find(({day}) => day === dayToFind).openHour;
}

// returns opening hour of gym on parameter dayToFind (int)
// 0: Sunday, 1: Monday, ...
function CLOSING_HOUR(dayToFind){
    return GYM_HOURS.find(({day}) => day === dayToFind).closeHour;
}

// Weights assigned to hours to manipulate randomly generated times in example entry data.
// Used in populateDay.js
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

// function to retrieve weights
function HOURLY_WEIGHTS(hourToFind){
    return HOURLY_WEIGHTS_LIST.find(({hour}) => hour === hourToFind).weight;
}

// factor used to determine total number of entries in a day
// used by populateDay.js
const DAILY_NUM_ENTRY_FACTOR = [
    {day : 0, factor: 0.8},
    {day : 1, factor: 1.1},
    {day : 2, factor: 1},
    {day : 3, factor: 1},
    {day : 4, factor: 1},
    {day : 5, factor: 0.9},
    {day : 6, factor: 0.7}
];

// retreives factor
function GET_DAILY_NUM_ENTRY_FACTOR(dayToFind){
    return DAILY_NUM_ENTRY_FACTOR.find(({day}) => day === dayToFind).factor;
}

// Used to determine total number of entries in a day in populateDay.js
const DAILY_ENTRY_MIN = 1000;
const DAILY_ENTRY_MAX = 2000;

exports.GET_DAILY_NUM_ENTRY_FACTOR = GET_DAILY_NUM_ENTRY_FACTOR
exports.BACKEND_PORT = BACKEND_PORT;
exports.DAILY_ENTRY_MIN = DAILY_ENTRY_MIN;
exports.DAILY_ENTRY_MAX = DAILY_ENTRY_MAX;
exports.OPENING_HOUR = OPENING_HOUR;
exports.CLOSING_HOUR = CLOSING_HOUR;
exports.HOURLY_WEIGHTS = HOURLY_WEIGHTS;