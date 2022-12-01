const saleService = require('../services/saleService');

const getSales = async (req, res, next) => {
  const user = req.user.dataValues;
  try {
     const result = await saleService.getAllSales(user);
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};
module.exports = { getSales };