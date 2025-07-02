const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  pmdcNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
  type: String,
  default: '', 
  },
specialization: {
  type: String,
  required: true,
},
dob: {
  type: String,
  required: true,
},

}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
