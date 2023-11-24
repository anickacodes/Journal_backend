const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.send("Welcome to our Journal App");
  });

const entryController = require("./controllers/entryController.js");
app.use("/entries", entryController);





  
//   app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   }));

app.get("*", (req, res) => {
  res.status(404).send("404 ERROR Page not found");
});

module.exports = app;
