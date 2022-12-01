const { getAllSales } = require('../services/saleService');

const getSales = async (req, res, next) => {
  const user = req.user.dataValues;
  console.log(user);
  try {
     const result = await getAllSales(user);
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};
module.exports = { getSales };