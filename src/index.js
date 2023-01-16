const express = require("express");
const path = require("path");
const data = require(path.resolve(__dirname, "../usernames.json"));
const { ConnectToDb, LoadDb, CreateUser, Close } = require("./mongo");
//Setting up an instance of express server
const app = express();

//Keeping track on the number of web requests
var reqCount = 0;

//Generating a random integer
const getRandomInt = (max) => Math.floor(Math.random() * max);

//localhost:4000
app.get("/", (req, res) => res.send("Hello World!"));

//localhost:4000/username
app.post("/username", (req, res) => {
  var start = "";
  if (req.query.start) {
    start = req.query.start;
  }
  if (start == "") {
    //Input field is empty
    res.send(data.usernames[getRandomInt(data.usernames.length)]);
  } else {
    //User started typing
    const filteredList = data.usernames.filter((u) => (u.startsWith(start) ? u : null));

    res.send(filteredList[getRandomInt(filteredList.length)].toUpperCase());
  }
});

//localhost:4000/random
app.post("/random", (req, res) => {
  reqCount++;
  var max = 100;
  if (req.query.max) {
    max = parseInt(req.query.max);
  }
  return res.send(JSON.stringify({ request: reqCount, random: getRandomInt(max).toString() }));
});

app.post("/register", (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  const email = req.query.email;
  const password = req.query.password;
  if (name != null && surname != null && email != null && password != null) {
    //register the user
    CreateUser(name, surname, email, password).then((r) => Close());
    res.send(email + " registered successfully");
  } else {
    res.send("Error: Unable to create user!");
  }
});

//Connect to the DB
//If the connection is successful, start the server (listening)
//Else output the error
ConnectToDb()
  .then((r) => {
    LoadDb();
    console.log("Connected successfully to database server");
    app.listen(4000, () => console.log(`API listening in port 4000`));
  })
  .catch((e) => console.log(e));
