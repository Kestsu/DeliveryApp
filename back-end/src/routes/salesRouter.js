const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', authMiddleware, saleController.createSale);
router.get('/:id', authMiddleware, saleController.getSaleById);

module.exports = router;
