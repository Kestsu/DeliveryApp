const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', authMiddleware, saleController.createSale);

module.exports = router;
