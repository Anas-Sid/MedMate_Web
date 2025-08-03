const express = require('express');
const router = express.Router();
const { signupPatient, loginPatient,getAllPatients } = require('../controllers/patientController');

const Patient = require('../models/Patient');


router.post('/signup', signupPatient);
router.post('/login', loginPatient);
router.get('/all', getAllPatients)

module.exports = router;
