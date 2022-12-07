const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

require('dotenv/config');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'secret_key';

// const secret = require('fs').readFileSync('./back-end/jwt.evaluation.key', {
  // encoding: 'utf-8',
// });

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  try {
    if (!token) throw new Error();

    const { email } = jwt.verify(token, secret);

    const user = await userService.getUserByEmail(email);

    req.user = user;

    next();
  } catch (error) {
    const unauthorizedError = new UnauthorizedError();
    res
      .status(unauthorizedError.status)
      .json({ message: unauthorizedError.message });
  }
};
