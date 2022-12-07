const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const { status, result } = await userService.register({
      email,
      password,
      name,
    });
    return res.status(status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
