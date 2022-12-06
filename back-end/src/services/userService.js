const { User } = require('../database/models');
const { NotFoundError, UnexpectedError } = require('../errors');

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new NotFoundError();
  }

  return user;
};

const getAllSellers = async () => {
  try {
    const sellers = await User.findAll({
      where: {
        role: 'seller',
      },
      attributes: { exclude: ['password'] },
    });

    return sellers;
  } catch (error) {
    throw UnexpectedError();
  }
};

module.exports = {
  getUserByEmail,
  getAllSellers,
};
