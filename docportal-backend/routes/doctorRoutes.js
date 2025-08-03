const express = require('express');
const router = express.Router();

// ✅ Correct single import
const {
  signupDoctor,
  loginDoctor,
  getAllDoctors
} = require('../controllers/doctorController');

router.post('/signup', signupDoctor);
router.post('/login', loginDoctor);

router.get('/all', getAllDoctors); // ✅ cleaner and direct

module.exports = router;
