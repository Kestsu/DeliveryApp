const md5 = require('md5');
const { User } = require('../database/models');
const { geraToken } = require('../utils/tokenGeneration');
const { NotFoundError } = require('../errors');

const getUser = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['name', 'role'],
    where: {
      email,
      password: md5(password),
    },
  });

  if (!user) throw new NotFoundError();
  
  const { name, role } = user.dataValues;
  
  const token = geraToken({ email, role });
  
  const result = { name, email, role, token };
  return result;
};

module.exports = {
  getUser,
};