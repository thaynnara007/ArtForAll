const express = require('express');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const profileRouter = require('./profile/ProfileRoute')
//const art = require('./art/Art.js')
//const profile = require('./profile/Profile.js');

const app = express();

app.listen(3000, () => console.log("app running at port 3000"));

/*
	res.setHeader('Content-Type', 'application/json'); 
	next();	
}); */

//app.use(bodyParser.json());

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

/*
app.get('/profile', (req, res) =>{ 

	res.json(profile.profiles);
});

app.post('/profile', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
})

/*app.get('/profile/arts', (req, res) =>{

	res.json([art.arts]);
});

app.get('/profile/arts/:id', (req, res) =>{ 

	var id = req.params.id
	res.json(art.arts[id]);
});

app.post('/profile/arts', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
});

app.get('/profile/arts/favorite', (req, res) =>{

	res.json(art.favorites);
});

app.get('/profile/arts/favorite/:id', (req,res) =>{

	var id = req.params.id
	res.json(art.favorites[id]);
});

app.post('/profile/arts/favorite', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
}); 

app.get('/profile/following', (req, res) =>{

	names = ["clara", "gabriel", "igor", "sophia"];
	res.json(names);
});

app.get('/profile/following/:id', (req, res) =>{

	var id = req.params.id;
	res.json(profile.profiles[id]);
});

app.post('/profile/following', (req, res) =>{

	var require = req.body;
	res.send(JSON.stringify(require, null, 2));
})

app.get('/api-docs.json', function(req, res){

	res.send()
}) */

module.exports = app;