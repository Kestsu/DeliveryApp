const { getProducts } = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await getProducts();
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};
module.exports = { getAllProducts };