const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
router.get('/home', userController.home);
router.get('/newAppointment', userController.newAppointmentPage);
router.get('/trackAppointments', userController.trackAppointments)
module.exports = router;