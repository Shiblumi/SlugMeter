/*
server.js
Run with 'node server.js' to host backend server.
Default port from constants.js is 3001.
Server and routing were built using express.
to call any function, use URL http://localhost:3001/request
to pass parameters, add them in this format to end of URL:
?parameter1=val1&parameter2=val2
common valid parameters are:
year (int), month (int 0-11), day (int), duration (int), granularity (int)
*/

const express = require("express");
const app = express();

const {
  signinsOfDay,
  occupancyOfDay,
  currentOccupancy,
  insertCurrentTime,
  signinsOfMonth,
  predictions,
} = require("./serverUtils");

const { BACKEND_PORT } = require("../constants.js");
const port = BACKEND_PORT;

// These cors settings allow the data retrieved from the backend to be read
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Form a connection the DB
const { connectDB } = require("../mongoInterface");
const connection = connectDB();

// Helper function that parses paramaters passed to a GET request using format ?parameter1=val1&parameter2=val2
// returns a map of all possible parameters and their values
// if no value is passed, returns a default value
// year: valid int > 1970
// month: 0 <= valid int <= 11
// day: 0 <= valid int <= 31
// granularity: 5 <= valid int <= 600
// represents divisions in graph by minutes, currently nonfunctional
// duration: 5 <= valid int <= 720
// represents expected time in minutes spent in gym to measure occupancy
function parseReq(query){
  
  //Time interval to display data. In minutes
  const minGranularity = 5,
    maxGranularity = 600,
    defaultGranularity = 60;
  let granularity = parseInt(query.granularity);
  if (
    isNaN(granularity) ||
    granularity < minGranularity ||
    granularity > maxGranularity
  ) {
    granularity = defaultGranularity;
  }

  //Expected time to stay in gym. In minutes
  const minDuration = 5,
    maxDuration = 720,
    defaultDuration = 90;
  let duration = parseInt(query.duration);
  if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
    duration = defaultDuration;
  }

  curDay = new Date();
  let day = parseInt(query.day);
  if (isNaN(day) || day < 0 || day > 31) {
    day = curDay.getDate();
  }
  let month = parseInt(query.month);
  if (isNaN(month) || month < 0 || month > 11) {
    month = curDay.getMonth();
  }
  let year = parseInt(query.year);
  if (isNaN(year) || year < 1970) {
    year = curDay.getFullYear();
  }
  
  let parameters = {
    granularity: granularity,
    stayDuration: duration,
    day: day,
    month: month,
    year: year
  };

  return parameters;
}

// GETS JSON object with format:
// {0: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  1: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  2: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  ...
//  6: [{time: Date, count: int}, {time: Date, count: int}, ...]}
// The top-level key represents the day of the upcoming week. 
// The key's value is an array that holds time, val pairs for each bar on the graph
// It takes no parameters
app.get("/predictionsOfWeek/", async (req, res) => {
  try {
    let predictionJSON = await predictions();
    res.json(predictionJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS an ordered list of JSON objects with format:
// [{time: Date, count: int}, {time: Date, count: int}, ...],
// each array element holds a time and count which represents a bar on the graph
// It takes year (int), month (int 0-11), day (int), and granularity (int) as parameters
app.get("/signinsOfDay/", async (req, res) => {
  try {
    const parameters = parseReq(req.query);
    const date = new Date();
    date.setFullYear(parameters.year, parameters.month, parameters.day);

    let result = await signinsOfDay(connection, date, parameters.granularity);
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS JSON object with format:
// {0: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  1: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  2: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  ...
//  6: [{time: Date, count: int}, {time: Date, count: int}, ...]}
// The top-level key represents a day in the previous week from the day parameter. 
// The key's value is an array that holds time, val pairs for each bar on the graph
// It takes year (int), month (int 0-11), day (int), and granularity (int) as parameters
app.get("/signinsOfWeek/", async (req, res) => {
  try {
    const parameters = parseReq(req.query);
    const date = new Date();
    date.setFullYear(parameters.year, parameters.month, parameters.day);

    // Call signinsOfDay of for each day of the previous week
    let weeklyJSON = [];
    for (let i = 6; i >= 0; i--) {
      let result = await signinsOfDay(connection, date, parameters.granularity);
      weeklyJSON.push({ day: date.getDay(), data: result });
      date.setDate(date.getDate() - 1);
    }
    res.json(weeklyJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS an ordered list of JSON objects with format:
// [{day: Date, count: int}, {day: Date, count: int}, ...],
// Each element of the list holds a date and count to be passed to the heatmap graph
// It takes year (int) and month (int 0-11) as parameters
app.get("/signinsOfMonth/", async (req, res) => {
  try {
    const parameters = parseReq(req.query);
    monthlyJSON = await signinsOfMonth(connection, parameters.year, parameters.month);
    res.json(monthlyJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS an ordered list of JSON objects with format:
// [{time: Date, count: int}, {time: Date, count: int}, ...],
// each array element holds a time and count which represents a bar on the graph
// It takes year (int), month (int 0-11), day (int), duration (int), and granularity (int) as parameters
app.get("/occupancyOfDay", async (req, res) => {
  try {
    const parameters = parseReq(req.query);
    const date = new Date();
    date.setFullYear(parameters.year, parameters.month, parameters.day);

    let result = await occupancyOfDay(
      connection,
      date,
      parameters.granularity,
      parameters.stayDuration
    );
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS JSON object with format:
// {0: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  1: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  2: [{time: Date, count: int}, {time: Date, count: int}, ...],
//  ...
//  6: [{time: Date, count: int}, {time: Date, count: int}, ...]}
// The top-level key represents a day in the previous week from the day parameter. 
// The key's value is an array that holds time, val pairs for each bar on the graph
// It takes year (int), month (int 0-11), day (int), duration (int), and granularity (int) as parameters
app.get("/occupancyOfWeek", async (req, res) => {
  try {
    const parameters = parseReq(req.query);
    const date = new Date();
    date.setFullYear(parameters.year, parameters.month, parameters.day);

    // Call occupancyOfDay for each day of the previous week
    let weeklyJSON = [];
    for (let i = 6; i >= 0; i--) {
      let result = await occupancyOfDay(
        connection,
        date,
        parameters.granularity,
        parameters.stayDuration
      );
      weeklyJSON.push({ day: date.getDay(), data: result });
      date.setDate(date.getDate() - 1);
    }
    res.json(weeklyJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GETS JSON object with format:
// {occupancy: int}
// It takes duration (int) as a parameter
app.get("/currentOccupancy", async (req, res) => {
  try {
    //Expected time to stay in gym. In minutes
    const parameters = parseReq(req.query);
    const curOccupancy = await currentOccupancy(connection, parameters.stayDuration);
    res.json({ occupancy: curOccupancy });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Calling this function will add an entry into the database with the current time
// It takes isEntry (bool) as a paramter, which currently has no effects.
app.get("/scanin", async (req, res) => {
  try {
    // If isEntry parameter is not "false", then it's true
    let isEntry = req.query.isEntry;
    isEntry = !(isEntry === "false");

    let result = insertCurrentTime(connection, isEntry);
    if (!result) {
      res.status(500).json({ error: "Problem inserting into database" });
    }
    res.status(200).send("OK");

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
