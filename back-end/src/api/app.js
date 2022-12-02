const express = require('express');

const errorMiddleware = require('../middleware/errorMiddleware');

const loginRouter = require('../routes/loginRouter');
const userRouter = require('../routes/userRouter');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);

module.exports = app;