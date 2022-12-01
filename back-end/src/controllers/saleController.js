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

const createSale = async (req, res, next) => {
  try {
    const result = await saleService.createSale({
      ...req.body,
      userId: req.user.id,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const result = await saleService.getSaleById(req.params.id, req.user);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  createSale,
  getSaleById,
};
