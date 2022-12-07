const { UnauthorizedError } = require('../errors');

module.exports = async (req, res, next) => {
  const { user } = req;

  try {
    if (user.role !== 'administrator') throw new Error();
    return next();
  } catch (error) {
    const unauthorizedError = new UnauthorizedError();
    return res.status(unauthorizedError.status).json(unauthorizedError.message);
  }
};
