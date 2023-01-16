const { MongoClient } = require("mongodb");
const path = require("path");
const db = require(path.resolve(__dirname, "../config/db.json"));

const client = new MongoClient(db.url);
const dbName = "CG";
var dbConnection;

// Use connect method to connect to the server
module.exports.ConnectToDb = async () => await client.connect();

module.exports.LoadDb = () => {
  dbConnection = client.db(dbName);
};
