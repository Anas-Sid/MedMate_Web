const express = require('express');
const router = express.Router();
const { signupPatient, loginPatient } = require('../controllers/patientController');


router.post('/signup', signupPatient);
router.post('/login', loginPatient);

module.exports = router;
