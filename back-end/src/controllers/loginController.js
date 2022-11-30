const { getUser } = require('../services/loginService');

const loginPost = async (req, res) => {
  try {
    const result = await getUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    const err = error;
    return res.status(err.status).json({ message: err.message });
  }
};
module.exports = { loginPost };