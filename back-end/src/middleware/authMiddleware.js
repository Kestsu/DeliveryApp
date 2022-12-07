const jwt = require('jsonwebtoken');
const secret = require('fs').readFileSync('jwt.evaluation.key', {
  encoding: 'utf-8',
});
const { UnauthorizedError } = require('../errors');

require('dotenv/config');
const userService = require('../services/userService');

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
