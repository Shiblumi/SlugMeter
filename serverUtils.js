require("dotenv").config();
// MongoDB setup
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

async function timestampsLastHour() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const collection = client.db("SlugMeterTest").collection("Times");

  // Calculate the date and time 1 hour ago
  const currentDate = new Date();
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  // Query your MongoDB collection to get the data
  const data = await collection
    .find({ timestamp: { $gte: oneHourAgo, $lte: currentDate } })
    .toArray();
  // Extract the "timestamp" values and format the response
  const timestamps = data.map((item) => item.timestamp);
  console.log("TIMESTAMPS: " + timestamps);
  return timestamps;
}
async function timestampsByHour() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const collection = client.db("SlugMeterTest").collection("Times");

  // Calculate the date and time for the start of the day
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);

  // Initialize an array to store counts for each hour
  const hourlyCounts = Array.from({ length: 16 }, () => 0);

  // Query the MongoDB collection to get the data
  const data = await collection
    .find({ timestamp: { $gte: startOfDay, $lte: currentDate } })
    .toArray();

  // Count occurrences for each hour
  data.forEach((item) => {
    const hour = item.timestamp.getHours();
    hourlyCounts[hour - 6] += 1;
  });

  // Close the MongoDB connection
  await client.close();

  return hourlyCounts;
}

module.exports = {
  timestampsLastHour,
  timestampsByHour,
};
