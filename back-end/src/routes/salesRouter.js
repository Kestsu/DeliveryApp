const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const saleController = require('../controllers/saleController');

const router = express.Router();

module.exports = router;
