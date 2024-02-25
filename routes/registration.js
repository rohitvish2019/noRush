const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration');
router.get('/Doctor', registrationController.RegistrationDoctors);
router.post('/new/Doctor', registrationController.addDoctor);
module.exports = router;