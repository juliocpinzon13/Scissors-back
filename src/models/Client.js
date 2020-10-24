const mongoose = require('mongoose');
const { Schema } = mongoose;

const Client = new Schema({
  name: String,
  email: String,
  number: Number,
  address: String,
  location: String,
  photo: String,
  password: String,
  date: Date
});

module.exports = mongoose.model('Client', Client);