const { MongoClient } = require("mongodb");
const path = require("path");
const db = require(path.resolve(__dirname, "../config/db.json"));
var crypto = require("crypto");

const client = new MongoClient(db.url);
const dbName = "CG";
var dbConnection;

// Use connect method to connect to the server
module.exports.ConnectToDb = async () => await client.connect();

module.exports.LoadDb = () => {
  dbConnection = client.db(dbName);
};

module.exports.CreateUser = async (name, surname, email, password) => {
  return await dbConnection.collection("Users").insertOne({ name: name, surname: surname, email: email, password: HashPassword(password) });
};

module.exports.Close = () => {
  client.close();
};

const HashPassword = (password) => crypto.createHash("sha256").update(password).digest("base64");
