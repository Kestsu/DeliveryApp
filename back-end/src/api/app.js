const express = require('express');
const cors = require('cors');

const errorMiddleware = require('../middleware/errorMiddleware');

const loginRouter = require('../routes/loginRouter');
const registerRouter = require('../routes/registerRouter');
const productsRouter = require('../routes/productsRouter');
const salesRouter = require('../routes/salesRouter');
const adminRouter = require('../routes/adminRouter');
const sellerRouter = require('../routes/sellerRouter');

const checkRouter = require('../routes/checkRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/images'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use('/users', adminRouter);

app.use('/sellers', sellerRouter);

app.use('/check', checkRouter);

app.use(errorMiddleware);

module.exports = app;
