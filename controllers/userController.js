const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "username email password");
    console.log(user);
    if (!user)
      res
        .status(404)
        .json({ message: "Sorry, User ID not find. via controller" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", ...user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

usersRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request body:", { username, password })
//   const secretKey = crypto.randomBytes(32).toString("hex");
//   console.log(secretKey);
const user = await User.findOne({ username });
console.log("Found user:", user);

if (user && (await bcrypt.compare(password, user.password))) {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  console.log("Generated Token:", token);
  res.status(200).json({ message: "Login successful", user, token });
} else {
  res.status(401).json({ message: "Invalid username or password" });
}
})

module.exports = usersRouter;
