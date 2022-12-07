require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = require('fs').readFileSync('./back-end/jwt.evaluation.key', {
  encoding: 'utf-8',
});

const geraToken = (campos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const data = {
    email: campos.email,
    role: campos.role,
  };

  const token = jwt.sign(data, secret, jwtConfig);

  return token;
};

module.exports = { geraToken };
