const productsService = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const result = await productsService.getProducts();
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};
module.exports = { getAllProducts };