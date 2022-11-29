const { User, Product, Sale } = require('../database/models');

const testModels = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  const products = await Product.findAll({
    include: {
      model: Sale,
      as: 'sales',
    },
  });
  const sales = await Sale.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: User,
        as: 'seller',
      },
      {
        model: Product,
        as: 'products',
      },
    ],
  });

  console.log(users);
  console.log(products[1].sales);
  console.log(sales);
};

testModels();
