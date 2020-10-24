const mongoose = require('mongoose');
const { Schema } = mongoose;

const Stylist = new Schema({
  name: String,
  email: String,
  number: Number,
  address: String,
  identifier: Number,
  typeJobs: [String],
  jobs: [{ name: String, price: Number }],
  photo: String,
  locations: [String],
  jobsExamples: [{ photo: String, description: String }],
  password: String,
  date: Date
});

module.exports = mongoose.model('Stylist', Stylist);