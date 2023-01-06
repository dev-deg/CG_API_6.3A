const express = require("express");

const app = express();
var reqCount = 0;
const getRandomInt = (max) => Math.floor(Math.random() * max);

app.get("/", (req, res) => res.send("Hello World"));

app.post("/random", (req, res) => {
  reqCount++;
  var max = 100;
  if (req.query.max) {
    max = parseInt(req.query.max);
  }
  return res.send(JSON.stringify({ request: reqCount, random: getRandomInt(max).toString() }));
});

app.listen(4000, () => console.log(`API listening in port 4000`));
