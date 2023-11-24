const express = require("express");
const entry = express.Router();
const entriesArray = require("../models/entry");

const {
  checkDate,
  checkTime,
  checkAuthor,
  checkContent,
} = require("../validations/entry");

entry.get("/", async (req, res) => {
  res.json(entriesArray);
});

entry.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundEntry = entriesArray.find((entry) => entry.id.toString() === id);

  if (foundEntry) {
    res.json(foundEntry);
    console.log("excuse", foundEntry);
  } else {
    res.status(404).json("no id matching");
  }
});

// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };

// Route for private entry creation
// app.get('/new', isLoggedIn, (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// const Entry = {
//   text: String,
//   isPrivate: Boolean,
//   owner: String, // Username of the entry owner
// };
// authenticateUser,
// Example server-side code to retrieve entries
// entry.get('/entries/:id',  (req, res) => {
//   const id = req.params.id;

//   const entry = Entry.findById(id);

//   if (!entry || (entry.isPrivate && entry.owner !== req.user.username)) {
//     return res.status(403).json({ error: 'Unauthorized' });
//   }

//   res.json(entry);
// });

entry.post("/", checkDate, checkTime, checkAuthor, checkContent, (req, res) => {
  const { id, Date, Time, Author, Content } = req.body;

  const newEntry = {
    id,
    Date,
    Time,
    Author,
    Content,
  };
  console.log(`sent`, newEntry);
  entriesArray.push(newEntry);
  res.status(201).json(entriesArray);
});

entry.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log('ID from URL:', id, typeof id);
  const entryToUpdate = entriesArray.find((entry) => {
    console.log('Comparing entry.id:', entry.id, typeof entry.id);
    return entry.id.toString() == id;
  });
  

  if (!entryToUpdate) {
    return res.status(404).json({ error: "Entry not found" });
  }

  const { Date, Time, Author, Content } = req.body;
  const updatedEntry = {
    id: entryToUpdate.id, // Maintain the existing ID
    Date,
    Time,
    Author,
    Content,
  };

  const updatedArray = entriesArray.map((entry) =>
  entry.id === entryToUpdate.id ? updatedEntry : entry
);

  res.status(200).json(updatedArray);
});


// entry.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   entriesArray.splice(id, 1);
//   res.status(303).send("Ok");
// });

module.exports = entry;
