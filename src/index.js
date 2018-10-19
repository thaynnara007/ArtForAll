const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user/UserRouter');
const cors = require('cors');
const app = express();
const auth = require('./auth/AuthRoute');

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static('../static'));
app.use('/login', auth);
app.use('/user', userRouter);

app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

module.exports = app;