const express = require('express');
const morgan = require('morgan');
const profileRouter = require('./profile/ProfileRoute')


const app = express();

app.use(morgan("tiny"));

app.use(express.static('../static'));

app.use('/profile', profileRouter);

//---------------------------------------------//


app.get('/', (req, res) =>{

	res.json('Welcome to ArtForAll');
})

app.get('/signup', (req, res) =>{

	res.status(200).json({name:"name", old:1, handle:"Johann Sebastian Bach", senha:"*****", email:"afsffs@sdf.dfd"});
})

app.post('/login', function(req, res) {
  
  res.json(req.body);
})

app.get('/login', (req, res) =>{

	res.status(200).json({handle: "jonseba", senha:"*******"});
})

module.exports = app;