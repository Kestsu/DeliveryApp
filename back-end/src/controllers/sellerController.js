const userService = require('../services/userService');

const getSellers = async (req, res, next) => {
  try {
    const result = await userService.getAllSellers();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
};
