const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const sellerController = require('../controllers/sellerController');

const router = express.Router();

router.get('/', authMiddleware, sellerController.getSellers);

module.exports = router;
