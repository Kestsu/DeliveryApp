const adminService = require('../services/adminService');

const getAllUsers = async (_req, res, next) => {
  try {
    const result = await adminService.getUserAdmin();
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const result = await adminService.createNewUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
     next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteUser(Number(id));
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};

module.exports = { getAllUsers, createNewUser, deleteUser };