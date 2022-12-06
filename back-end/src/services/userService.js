const md5 = require('md5');
const { geraToken } = require('../utils/tokenGeneration');
const { User } = require('../database/models');
const { ConflictError } = require('../errors');

const register = async ({ email, password, name }) => {
  const isAlreadyRegistered = await User.findOne({ where: { email } });
  if (isAlreadyRegistered) throw new ConflictError('Email already registered');
  const md5password = md5(password);
  const newUser = await User.create({ name, email, password: md5password, role: 'user' });
  const token = geraToken(newUser);
  return { status: 201, result: { name, email, role: newUser.role, token } };
};

module.exports = {
  register,
};
