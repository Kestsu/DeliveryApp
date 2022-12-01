const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const { getSales } = require('../controllers/saleController');

const router = express.Router();

router.get('/', authMiddleware, getSales);

module.exports = router;