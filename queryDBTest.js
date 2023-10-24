//Code modified from MongoDB Usage Guide
//https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://webServer:hkSEd64DH1wujNPD@slugmetercluster.de0aesc.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'SlugMeterTest';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Times');

  let findResult = await collection.countDocuments();
  console.log(findResult);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());