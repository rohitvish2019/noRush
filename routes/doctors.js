const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');
router.get('/getAll', doctorsController.getAllDoctors);
module.exports = router;