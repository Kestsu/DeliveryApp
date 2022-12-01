const express = require('express');

const adminController = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');

const validateUserAdmin = require('../middleware/validateUserAdmin');

const router = express.Router();

router.get('/', authMiddleware, validateUserAdmin, adminController.getAllUsers);

module.exports = router;
