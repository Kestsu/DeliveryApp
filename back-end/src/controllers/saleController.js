const saleService = require('../services/saleService');

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

module.exports = {
  createSale,
};
