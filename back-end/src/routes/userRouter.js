const express = require('express');
const { default: registers } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registers);
module.exports = router;