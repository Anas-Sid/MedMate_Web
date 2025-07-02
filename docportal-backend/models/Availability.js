const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  fromTime: {
    type: String, 
    required: true,
  },
  toTime: {
    type: String, 
    required: true,
  },
  appointmentDuration: {
    type: Number, 
    required: true,
  },
});

module.exports = mongoose.model('Availability', availabilitySchema);
