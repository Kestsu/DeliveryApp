const { User }  = require('../database/models');
const { geraToken } = require('../utils/tokenGeneration');
const md5 = require('md5');
const InvalidCredentials = require('../errors/loginError')

const getUser = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['name', 'role'],
    where: {
      email,
      password: md5(password),
    },
  });

  if (!user) throw new InvalidCredentials('Not found');
  
  const { name, role } = user.dataValues
  
  const token = geraToken({ email, role });
  
  const result = { name, email, role, token }
  return result
};

module.exports = {
  getUser,
};