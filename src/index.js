const express = require("express");

const app = express();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/random", (req, res) => {
  var max = 100;
  if (req.query.max) {
    max = parseInt(req.query.max);
  }
  return res.send(getRandomInt(max).toString());
});

app.listen(4000, () => console.log(`API listening in port 4000`));
