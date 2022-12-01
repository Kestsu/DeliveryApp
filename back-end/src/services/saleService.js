const { Sale } = require('../database/models');

const getAllSales = async (user) => {
  if (user.role === 'customer') {
    const allSales = await Sale.findAll({ 
      where: { userId: user.id },
    });
    return allSales;
  }

   const allSales = await Sale.findAll({ 
    where: { sellerId: user.id },
   });

  return allSales;
};

module.exports = { getAllSales };
