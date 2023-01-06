const express = require("express");

//Setting up an instance of express server
const app = express();

//Keeping track on the number of web requests
var reqCount = 0;

//Generating a random integer
const getRandomInt = (max) => Math.floor(Math.random() * max);

//localhost:4000
app.get("/", (req, res) => res.send("Hello World"));

//localhost:4000/random
app.post("/random", (req, res) => {
  reqCount++;
  var max = 100;
  if (req.query.max) {
    max = parseInt(req.query.max);
  }
  return res.send(JSON.stringify({ request: reqCount, random: getRandomInt(max).toString() }));
});

//Starts the server
app.listen(4000, () => console.log(`API listening in port 4000`));
