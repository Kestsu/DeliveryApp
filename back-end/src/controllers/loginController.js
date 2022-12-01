const { getUser } = require('../services/loginService');

const loginPost = async (req, res, next) => {
  try {
    const result = await getUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
     next(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await userService.create({ email, password, name });
    if (!result) return res.status(409).json({ message: "Conflict" });
    return res.status(201).json({ ...result });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal_server_error"})
  }
}
module.exports = { loginPost };