const { MongoClient } = require("mongodb");

// Connection URL
const connectionString = ``;

const client = new MongoClient(url);

const dbName = "CG";

async function connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("Users");

  return null;
}
