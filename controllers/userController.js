const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
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

usersRouter.get("/register-test", async (req, res) => {
  try {
    const testUserData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    };
    const response = await fetch(`http://localhost:1133/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUserData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      res.status(200).send("Registration test successful");
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      res.status(500).send("Registration test failed");
    }
  } catch (error) {
    console.error("Error during registration test:", error);
    res.status(500).json({
      message: "Error during registration test",
      error: error.message,
    });
  }
});

usersRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const {
      username: registeredUsername,
      email: registeredEmail,
      _id: userId,
    } = user.toObject();

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          username: registeredUsername,
          email: registeredEmail,
          _id: userId,
        },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt with:", username, password);

    const user = await User.findOne({ username });

    console.log("User found in the database:", user.password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const storedHashedPassword = user ? user.password : undefined;

    console.log("Stored Hashed Password:", storedHashedPassword);

    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    console.log("Password Match:", passwordMatch);

    if (passwordMatch) {
      // req.session.user = { userId: user._id, username: user.username };
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "4h" }
      );

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Password does not match" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

usersRouter.post("/reset-password", async (req, res) => {
  try {
    const { password, token } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // TODO send confirmation email? 

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password", error: error.message });
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

module.exports = usersRouter;
