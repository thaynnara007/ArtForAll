const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user/UserRouter');
const cors = require('cors');
const app = express();
const auth = require('./auth/AuthRoute');

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static('../static'));
app.use('/auth', auth);
app.use('/user', userRouter);

//---------------------------------------------//


app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

app.post('/login', function(req, res) {
  
  res.json(req.body);
})

app.post('/singup',);

module.exports = app;