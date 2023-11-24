const express = require("express");
const entry = express.Router();
const entriesArray = require("../models/entry");

entry.get("/", async (req, res) => {
  res.json(entriesArray);
});

entry.get("/entries/:id", (req, res) => {
  const { id } = req.params;
  if (entriesArray[id]) {
    res.json(entriesArray[id]);
    console.log("excuse", entries[id]);
  } else {
    res.status(404).json("no id matching");
  }
});

entry.post("/entries", (req, res) => {
  const { Date, Time, Author, Content } = req.body;

  if (!Date || !Time || !Author || !Content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEntry = {
    Date,
    Time,
    Author,
    Content,
  };
  console.log(`sent`, newEntry);
  entriesArray.push(newEntry);
  res.status(201).json(entriesArray);
});

entry.put("/entries/:id", (req, res) => {
  const { id } = req.params;
  const arrayIndex = findIndexById(id);

  if (arrayIndex === -1) {
    return res.status(404).json({ error: "Entry not found" });
  }
  entriesArray[arrayIndex] = updatedEntry;
  res.status(200).json(entriesArray);
});

entry.delete("/entries/:id", (req, res) => {
  const { id } = req.params;
  entriesArray.splice(id, 1);
  res.status(303).send("Ok");
});

module.exports = entry;
