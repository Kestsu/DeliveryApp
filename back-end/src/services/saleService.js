require('dotenv/config');
const Sequelize = require('sequelize');
const { Sale, Product, SalesProducts, User } = require('../database/models');
const {
  NotFoundError,
  UnexpectedError,
  UnauthorizedError,
  BadRequestError,
} = require('../errors');

const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

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

const checkUserPermission = (sale, user) => {
  if (user.role === 'customer' && user.id === sale.userId) {
    return 'OK';
  }

  if (user.role === 'seller' && user.id === sale.sellerId) {
    return 'OK';
  }

  throw new UnauthorizedError();
};

const formatProductQuantity = (product) => {
  const formatted = { ...product.dataValues };
  delete formatted.SalesProducts;

  formatted.quantity = product.SalesProducts.quantity;
  return formatted;
};

const getSaleById = async (id, user) => {
  try {
    const { dataValues: sale } = await Sale.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: { exclude: ['password'] },
        },
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!sale) throw new NotFoundError(`Produto de id: ${id} não encontrado`);

    checkUserPermission(sale, user);

    sale.products = sale.products.map(formatProductQuantity);

    return sale;
  } catch (error) {
    if (error.status) throw error;
    throw new UnexpectedError();
  }
};

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
    return { saleId: id };
  } catch (error) {
    await t.rollback();

    if (error.status) throw error;

    throw new UnexpectedError();
  }
};

const isStatusSupported = (statusToCheck) => {
  const supportedStatus = {
    Preparando: 'seller',
    'Em Trânsito': 'seller',
    Entregue: 'customer',
  };

  return supportedStatus[statusToCheck] || false;
};

const checkBeforeUpdate = (newStatus, user) => {
  const statusCheck = isStatusSupported(newStatus);
  if (!statusCheck) throw new BadRequestError('Status não suportado');
  if (statusCheck !== user.role) throw new UnauthorizedError();
};

const checkAndGetSaleAfterUpdate = async (id) => {
  const { dataValues: sale } = await Sale.findOne({
    where: { id },
    include: [
      {
        model: Product,
        as: 'products',
      },
    ],
  });

  if (!sale) throw new NotFoundError();

  sale.products = sale.products.map(formatProductQuantity);
  return sale;
};

const updateSaleStatus = async (id, newStatus, user) => {
  try {
    checkBeforeUpdate(newStatus, user);

    await Sale.update({ status: newStatus }, { where: { id } });

    const updatedSale = await checkAndGetSaleAfterUpdate(id);

    return updatedSale;
  } catch (error) {
    if (error.status) throw error;
    throw new UnexpectedError();
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSaleStatus,
};
