const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
router.get('/getAll', doctorsController.getAllDoctors);
router.get('/getAvailability', doctorsController.getAvailabilityByID);
router.post('/setAvailability', doctorsController.setAvailibility);
router.get('/showBookings/:id', doctorsController.showBookings)
module.exports = router;