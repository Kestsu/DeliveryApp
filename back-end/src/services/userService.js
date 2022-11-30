const { User } = require('../database/models');
const { NotFoundError } = require('../errors');

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

module.exports = {
  getUserByEmail,
};
