// routes/availabilityRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require('../controllers/availabilityController');


router.get('/', getAvailability);


router.post('/', createAvailability);


router.put('/:id', updateAvailability);


router.delete('/:id', deleteAvailability);

module.exports = router;
