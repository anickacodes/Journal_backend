const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
// const session = require("express-session");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({extended: true}))

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );


app.get("/", (req, res) => {
  res.send("Welcome to our Journal App");
});

const entryController = require("./controllers/entryController.js");
const userController = require("./controllers/userController");

app.use("/entries", entryController);
app.use("/users", userController);


//   app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   }));

app.get("*", (req, res) => {
  res.status(404).send("404 ERROR Page not found");
});

module.exports = app;
