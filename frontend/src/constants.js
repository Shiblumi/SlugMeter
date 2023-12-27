/*
constants.js
holds constant values used by the frontend
*/

//Backend port specifies which port to call for backend calls
const BACKEND_PORT = 3001;

//Time in milliseconds between polling backend
const POLLING_INTERVAL = 5000;

//hours that gym is open on a specific day
//0 : Sunday, 1 : Monday, ...
const GYM_HOURS = [
  { day: 0, openHour: 8, closeHour: 20 },
  { day: 1, openHour: 6, closeHour: 23 },
  { day: 2, openHour: 6, closeHour: 23 },
  { day: 3, openHour: 6, closeHour: 23 },
  { day: 4, openHour: 6, closeHour: 23 },
  { day: 5, openHour: 6, closeHour: 22 },
  { day: 6, openHour: 8, closeHour: 20 },
];

//fetches opening hours
function OPENING_HOUR(dayToFind) {
  return GYM_HOURS.find(({ day }) => day === dayToFind).openHour;
}

//fetches opening hours
function CLOSING_HOUR(dayToFind) {
  return GYM_HOURS.find(({ day }) => day === dayToFind).closeHour;
}

// estimated min and max for daily entry
// used for color values on heatmap
const DAILY_ENTRY_MIN = 1000;
const DAILY_ENTRY_MAX = 2000;

exports.POLLING_INTERVAL = POLLING_INTERVAL;
exports.BACKEND_PORT = BACKEND_PORT;
exports.DAILY_ENTRY_MIN = DAILY_ENTRY_MIN;
exports.DAILY_ENTRY_MAX = DAILY_ENTRY_MAX;
exports.OPENING_HOUR = OPENING_HOUR;
exports.CLOSING_HOUR = CLOSING_HOUR;
