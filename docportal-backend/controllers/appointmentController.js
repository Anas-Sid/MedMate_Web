// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    
    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) {
      return res.status(400).json({ message: 'This time slot is already booked.' });
    }
   
    const newAppointment = new Appointment({ doctorId, patientId, date, time });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookedAppointments = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const appointments = await Appointment.find({ doctorId, date });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching booked appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) return res.status(400).json({ message: 'Patient ID is required' });

    const appointments = await Appointment.find({ patientId }).populate('doctorId', 'firstName lastName specialization');
    
    const formatted = appointments.map((a) => ({
      _id: a._id,
      date: a.date,
      time: a.time,
      doctor: a.doctorId,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching patient appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getPatientsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    
    const appointments = await Appointment.find({ doctorId })
      .populate('patientId')
      .sort({ date: -1 });

    
    const response = appointments.map((app) => ({
      name: `${capitalize(app.patientId.firstName)} ${capitalize(app.patientId.lastName)}`,
      label: app.patientId.email,
      time: app.time,
      date: app.date,
      initials: app.patientId.firstName.charAt(0).toUpperCase() + app.patientId.lastName.charAt(0).toUpperCase(),
      color: '#A2D2FF',
      labelColor: '#666',
      timeBg: '#D1D5DB',
      timeColor: '#1E40AF',
    }));

    res.json(response);
  } catch (err) {
    console.error('Error fetching patient appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
}
