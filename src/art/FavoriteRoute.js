const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const art = require('./Art');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

/**
get all favorite arts from a user
*/
router.get('/', (req, res) =>{

	res.status(200).json(art.favorites());
});
/**
get a specific favorite art from a user
*/
router.get('/:name', (req,res) =>{

	var artName = req.params.name
	res.json(art.getOneFavoriteArt(artName)[0]);
});
/**
add one favorite art
*/
router.post('/', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
});

module.exports = router;