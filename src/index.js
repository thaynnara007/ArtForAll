const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user/UserRouter');
const cors = require('cors');
const app = express();
const auth = require('./auth/AuthRoute');
const singUpRoute = require('./register/SingUpRoute');

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static('../static'));
app.use('/auth', auth);
app.use('/user', userRouter);
app.use('/singup', singUpRoute );

app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

module.exports = app;