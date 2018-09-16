const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const artRouter = require('../art/ArtRoute');
const favoriteRoute = require('../art/FavoriteRoute');
const profile = require('./Profile.js')

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.use('/myarts', artRouter);
router.use('/favorite', favoriteRoute);
/**
get a profile from a user 
*/
router.get('/:username', (req, res) =>{ 

	var username = req.params.username;
	var user = profile.getOneProfile(username)[0];
	res.json(user);
});
/**
add a new profile
*/
router.post('/', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
})

router.get('/following', (req, res) =>{

	names = ["clara", "gabriel", "igor", "sophia"];
	res.json(names);
});

router.get('/following/:id', (req, res) =>{

	var id = req.params.id;
	res.json(profile.profiles[id]);
});

router.post('/following', (req, res) =>{

	var require = req.body;
	res.send(JSON.stringify(require, null, 2));
});

module.exports = router;