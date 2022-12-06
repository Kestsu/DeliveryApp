const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const { status, result } = await userService.register({ email, password, name });
    return res.status(status).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register };
