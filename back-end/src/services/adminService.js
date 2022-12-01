const { User } = require('../database/models');

const getUserAdmin = async () => {
  const userAdminAll = await User.findAll({ });
   return userAdminAll;
};

module.exports = {
  getUserAdmin,
};
