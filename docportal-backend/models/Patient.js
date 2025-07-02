const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  contactNumber: String,
});

module.exports = mongoose.model('Patient', patientSchema);
