
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/validate-token", async (req, res) => {
    const token = req.body.token;
  
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      res.status(200).json({ message: "Token is valid", decoded });
    } catch (error) {
      res.status(401).json({ message: "Token is invalid" });
    }
  });