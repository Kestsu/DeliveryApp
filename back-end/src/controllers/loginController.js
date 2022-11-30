const { getUser } = require('../services/loginService');

const loginPost = async (req, res, next) => {
  try {
    const result = await getUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
     next(error)
  }
};
module.exports = { loginPost };