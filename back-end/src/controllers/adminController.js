const adminService = require('../services/adminService');

const getAllUsers = async (_req, res, next) => {
  try {
    const result = await adminService.getUserAdmin();
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};
module.exports = { getAllUsers };