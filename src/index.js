const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user/UserRouter');
const userOpenRouter = require('./user/UserOpenRouter');
const cors = require('cors');
const app = express();
const auth = require('./auth/AuthRoute');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static('../static'));
app.use('/login', auth);
app.use('/user', userRouter);
app.use('/userr', userOpenRouter);

app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

module.exports = app;