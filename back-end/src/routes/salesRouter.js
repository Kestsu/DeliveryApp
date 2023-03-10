const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/', authMiddleware, saleController.getSales);
router.post('/', authMiddleware, saleController.createSale);
router.get('/:id', authMiddleware, saleController.getSaleById);
router.patch('/:id', authMiddleware, saleController.updateSaleStatus);

module.exports = router;
