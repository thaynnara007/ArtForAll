const express = require('express');
const morgan = require('morgan');
const userRouter = require('./user/UserRouter');
const cors = require('cors');
const passport = require('./auth/passport');
const app = express();
const auth = require('./auth/Auth');

app.use(cors());
app.use('/auth', auth);
app.use(morgan("tiny"));
app.use(express.static('../static'));
app.use('/user', userRouter);

//---------------------------------------------//


app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

app.post('/login', function(req, res) {
  
  res.json(req.body);
})

app.get('/login', (req, res) =>{

	res.status(200).json({handle: "jonseba", senha:"*******"});
})

module.exports = app;