require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_key';

const geraToken = (campos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const data = {
    email: campos.email,
    role: campos.role
  };

  const token = jwt.sign(data, secret, jwtConfig);

  return token;
};

module.exports = { geraToken };