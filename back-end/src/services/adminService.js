const md5 = require('md5');
const { User } = require('../database/models');
const { ConflictError, MissingFieldError } = require('../errors');

const getUserAdmin = async () => {
  const userAdminAll = await User.findAll({});
  return userAdminAll;
};

const validateBody = (newUser) => {
  const campos = ['name', 'email', 'password', 'role'];
  campos.forEach((field) => {
    if (!newUser[field]) {
      throw new MissingFieldError(`O campo "${field}" é obrigatório`);
    }
  });
};

const createNewUser = async (newUser) => {
  const { name, email, password, role } = newUser;

  validateBody(newUser);

  const user = await User.findOne({
    where: { email },
  });

  if (user) throw new ConflictError();

  const usuario = await User.create({
    name,
    email,
    password: md5(password),
    role,
  });

  const { dataValues } = usuario;
  const novousuario = dataValues;
 novousuario.id = usuario.null;
  delete novousuario.password;
  return novousuario;
};

module.exports = {
  getUserAdmin,
  createNewUser,
};
