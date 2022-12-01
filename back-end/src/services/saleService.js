require('dotenv/config');
const Sequelize = require('sequelize');
const { Sale, Product, SalesProducts, User } = require('../database/models');
const { NotFoundError, UnexpectedError } = require('../errors');

const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const createSalesProductsNN = async (saleId, products, t) => {
  try {
    const rowsToCreate = products.map(({ id, quantity }) => ({
      saleId,
      productId: id,
      quantity,
    }));

    await SalesProducts.bulkCreate(rowsToCreate, { transaction: t });
  } catch (error) {
    await t.rollback();
    throw new UnexpectedError();
  }
};

const getTotalPrice = async (products) => {
  const totalPrice = await products.reduce(async (acc, { id, quantity }) => {
    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError(`Produto de id: ${id} não encontrado`);
    }

    const { price } = product;

    const accPrice = await acc;

    return accPrice + parseFloat(price) * quantity;
  }, 0);

  return totalPrice.toFixed(2);
};

const buildSaleToCreateObj = async (checkoutObj) => {
  const { products, sellerId } = checkoutObj;

  const seller = await User.findOne({ where: { id: sellerId } });
  if (!seller || seller.role !== 'seller') {
    throw new NotFoundError(
      `Pessoa vendedora de id: ${sellerId} não encontrada`,
    );
  }

  const totalPrice = await getTotalPrice(products);

  const saleToCreate = {
    ...checkoutObj,
    totalPrice,
    saleDate: new Date(),
    status: 'Pendente',
  };
  delete saleToCreate.products;

  return saleToCreate;
};

const createSale = async (checkoutObj) => {
  const t = await sequelize.transaction();
  try {
    const saleToCreate = await buildSaleToCreateObj(checkoutObj);

    const { null: id } = await Sale.create(saleToCreate, {
      transaction: t,
    });

    await createSalesProductsNN(id, checkoutObj.products, t);

    await t.commit();
    return { message: 'Created' };
  } catch (error) {
    await t.rollback();

    if (error.status) throw error;

    throw new UnexpectedError();
  }
};

module.exports = {
  createSale,
};
