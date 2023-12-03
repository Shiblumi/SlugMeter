const express = require("express");
const {
  timestampsLastHour,
  timestampsByHour,
  signinsOfDay,
  occupancyOfDay,
  currentOccupancy,
  insertCurrentTime,
  signinsOfMonth,
  predictions
} = require("./serverUtils");
const { connectDB, queryCountInTimeframe } = require("./mongoInterface");
const pug = require("pug");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const {BACKEND_PORT} = require("./constants.js");
const port = BACKEND_PORT;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

const connection = connectDB();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", async (req, res) => {
  try {
    const lastHourTimestamps = await timestampsLastHour();
    const hourlyCounts = await timestampsByHour();

    res.render("live", { lastHourTimestamps, hourlyCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/trends", async (req, res) => {
  try {
    const lastHourTimestamps = await timestampsLastHour();
    const hourlyCounts = await timestampsByHour();

    res.render("trends", { lastHourTimestamps, hourlyCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/about", async (req, res) => {
  try {
    const lastHourTimestamps = await timestampsLastHour();
    const hourlyCounts = await timestampsByHour();

    res.render("about", { lastHourTimestamps, hourlyCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/predictionsOfWeek/", async (req, res) => {
  try {

    let predictionJSON = await predictions();
    res.json(predictionJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays sign-ins for each time frame after 'granularity' minutes
// Format: /signins/granularity=minutes
app.get("/signinsOfWeek/", async (req, res) => {
  try {
    //Time granularity to display data. In minutes
    const minGranularity = 5,
      maxGranularity = 600,
      defaultGranularity = 60;
    let granularity = parseInt(req.query.granularity);
    if (
      isNaN(granularity) ||
      granularity < minGranularity ||
      granularity > maxGranularity
    ) {
      granularity = defaultGranularity;
    }

    let day = parseInt(req.query.day);
    if (isNaN(day) || day < 0 || day > 31) {
      day = 1;
    }
    let month = parseInt(req.query.month);
    if (isNaN(month) || month < 0 || month > 11) {
      month = 0;
    }
    let year = parseInt(req.query.year);
    if (isNaN(year) || year < 1970) {
      year = 1970;
    }

    const date = new Date();
    date.setFullYear(year, month, day);

    let weeklyJSON = [];
    for(let i = 6; i >= 0; i--){
      let result = await signinsOfDay(connection, date, granularity);
      weeklyJSON.push({"day": date.getDay(), "data": result});
      date.setDate(date.getDate() - 1);
      
    }
    res.json(weeklyJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/signinsOfMonth/", async (req, res) => {
  try {

    let month = parseInt(req.query.month);
    if (isNaN(month) || month < 0 || month > 11) {
      month = 0;
    }
    let year = parseInt(req.query.year);
    if (isNaN(year) || year < 1970) {
      year = 1970;
    }

    

    
    monthlyJSON = await signinsOfMonth(connection, year, month);
    res.json(monthlyJSON);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays sign-ins for each time frame after 'granularity' minutes
// Format: /signins/granularity=minutes
app.get("/signins/", async (req, res) => {
  try {
    //Time granularity to display data. In minutes
    const minGranularity = 5,
      maxGranularity = 600,
      defaultGranularity = 60;
    let granularity = parseInt(req.query.granularity);
    if (
      isNaN(granularity) ||
      granularity < minGranularity ||
      granularity > maxGranularity
    ) {
      granularity = defaultGranularity;
    }

    let day = parseInt(req.query.day);
    if (isNaN(day) || day < 0 || day > 31) {
      day = 1;
    }
    let month = parseInt(req.query.month);
    if (isNaN(month) || month < 0 || month > 11) {
      month = 0;
    }
    let year = parseInt(req.query.year);
    if (isNaN(year) || year < 1970) {
      year = 1970;
    }

    const date = new Date();
    date.setFullYear(year, month, day);

    let result = await signinsOfDay(connection, date, granularity);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays estimated occupancy for each time frame after 'interval' minutes
// duration defines for how long an occupant is counted after their sign-in
// Format: /signins/interval=minutes
app.get("/occupancyOfWeek", async (req, res) => {
  try {
    //Time interval to display data. In minutes
    const minGranularity = 5,
      maxGranularity = 600,
      defaultGranularity = 60;
    let granularity = parseInt(req.query.granularity);
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
    let duration = parseInt(req.query.duration);
    if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
      duration = defaultDuration;
    }

    let day = parseInt(req.query.day);
    if (isNaN(day) || day < 0 || day > 31) {
      day = 1;
    }
    let month = parseInt(req.query.month);
    if (isNaN(month) || month < 0 || month > 11) {
      month = 0;
    }
    let year = parseInt(req.query.year);
    if (isNaN(year) || year < 1970) {
      year = 1970;
    }

    const date = new Date();
    date.setFullYear(year, month, day);

    let weeklyJSON = [];
    for(let i = 6; i >= 0; i--){
      let result = await occupancyOfDay(connection, date, granularity, duration);
      weeklyJSON.push({"day": date.getDay(), "data": result});
      date.setDate(date.getDate() - 1);
      
    }

    res.json(weeklyJSON);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Page that displays estimated occupancy for each time frame after 'interval' minutes
// duration defines for how long an occupant is counted after their sign-in
// Format: /signins/interval=minutes
app.get("/occupancy", async (req, res) => {
  try {
    //Time interval to display data. In minutes
    const minGranularity = 5,
      maxGranularity = 600,
      defaultGranularity = 60;
    let granularity = parseInt(req.query.granularity);
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
    let duration = parseInt(req.query.duration);
    if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
      duration = defaultDuration;
    }

    let day = parseInt(req.query.day);
    if (isNaN(day) || day < 0 || day > 31) {
      day = 1;
    }
    let month = parseInt(req.query.month);
    if (isNaN(month) || month < 0 || month > 11) {
      month = 0;
    }
    let year = parseInt(req.query.year);
    if (isNaN(year) || year < 1970) {
      year = 1970;
    }

    const date = new Date();
    date.setFullYear(year, month, day);

    let result = await occupancyOfDay(connection, date, granularity, duration);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/currentOccupancy", async (req, res) => {
  try {
    //Expected time to stay in gym. In minutes
    const minDuration = 5,
      maxDuration = 720,
      defaultDuration = 90;
    let duration = parseInt(req.query.duration);
    if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
      duration = defaultDuration;
    }

    const curOccupancy = await currentOccupancy(connection, duration);
    res.json({ occupancy: curOccupancy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Scan-in Page that will be destionation of QR code. Adds an entry to database at current time.
// responds with whether db update succeeded or failed.
app.get("/scanin", async (req, res) => {
  try {

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
