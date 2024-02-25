const express = require('express');
const router = express.Router();
router.use('/user', require('./user'));
router.use('/registration', require('./registration'));
router.use('/doctors', require('./doctors'))
module.exports = router;