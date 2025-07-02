// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getBookedAppointments,
  getAppointmentsByPatient, 
  getPatientsForDoctor,
} = require('../controllers/appointmentController');


router.post('/', createAppointment);


router.get('/booked', getBookedAppointments);

router.get('/patient/:patientId', getAppointmentsByPatient);

router.get('/doctor/:doctorId/patients', getPatientsForDoctor); 

module.exports = router;
