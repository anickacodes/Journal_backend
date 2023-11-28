const mongoose = require('mongoose');

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MongoDB URI:", MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'MongoDB connection error: 😢'));
mongoDB.once('open', () => {
  console.log('✅ Connected to the MongoDB');
});

module.exports = mongoDB;


