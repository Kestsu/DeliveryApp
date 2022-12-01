const { Sale } = require('../database/models');

const validaRole = (user) => {
  if (user.role === 'customer') {
    return { userId: user.id };
  }
  return { sellerId: user.id };
};

const getAllSales = async (user) => {
  const role = validaRole(user);

  const allSales = await Sale.findAll({
    where: role,
  });

  return allSales;
};

module.exports = { getAllSales };
