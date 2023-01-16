const { MongoClient } = require("mongodb");
const path = require("path");
const db = require(path.resolve(__dirname, "../config/db.json"));

const client = new MongoClient(db.url);
const dbName = "CG";

module.exports.ConnectToDb = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("Users");

  return null;
};
