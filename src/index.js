const express = require("express");

const app = express();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/random", (req, res) => {
  return res.send(getRandomInt(100).toString());
});

app.listen(4000, () => console.log(`API listening in port 4000`));
