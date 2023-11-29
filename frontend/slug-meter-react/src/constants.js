const BACKEND_PORT = 3001;

const POLLING_INTERVAL = 5000;

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

exports.POLLING_INTERVAL = POLLING_INTERVAL;
exports.BACKEND_PORT = BACKEND_PORT;
exports.OPENING_HOUR = OPENING_HOUR;
exports.CLOSING_HOUR = CLOSING_HOUR;