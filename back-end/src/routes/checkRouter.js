const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/auth', authMiddleware, async (req, res) => {
  console.log('req.user', req.user);
  console.log('req.body', req.body);

  res.status(200).send();
});

module.exports = router;
