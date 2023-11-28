const express = require("express");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
const User = require("../models/User");

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username email");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

usersRouter.get("/register", (req, res) => {
  res.status(200).send("Testing registration route");
});

usersRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //   const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    //   if (existingUser) {
    //     return res
    //       .status(400)
    //       .json({ message: "Username or email already exists" });
    //   }

    //   const saltRounds = 10;
    //   const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const user = new User({ username, email, password });
    // console.log("user before await", user);
   const user = await User.create( { username, email, password });
    console.log("user after await", User);

    res.status(201).json({ message: "User registered successfully", ...user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error});
  }
});

usersRouter.post("/login", async (req, res) => {
  // user login logic
});

module.exports = usersRouter;
