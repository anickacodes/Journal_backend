const express = require("express");
const app = express();

// const morgan = require("morgan");
const cors = require("cors");
const entryController = require("./controllers/entryController.js");

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
app.use("/entries", entryController);


app.get("/", (req, res) => {
  res.send("Welcome to our Journal App");
});


app.get("*", (req, res) => {
  res.status(404).send("404 ERROR Page not found");
});

module.exports = app;
