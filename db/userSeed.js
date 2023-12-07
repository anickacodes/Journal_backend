
const mongoose = require('mongoose');
const User = require('../models/User');
const mongoDB = require('./mongoDBConfig');

const seedUsers = async () => {
  try {
    const user1 = new User({ username: 'example1', email: 'example1@example.com', password: 'password1', power: 'jump' });
    const user2 = new User({ username: 'example2', email: 'example2@example.com', password: 'password2' , power: 'speed'});

    await User.insertMany([user1, user2]);

    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
