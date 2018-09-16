const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./FavoriteController');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

/**
get all favorite arts from a user
*/
router.get('/', controller.getAll);
/**
get a specific favorite art from a user
*/
router.get('/:name', controller.getOne);
/**
add one favorite art
*/
router.post('/', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
	res.status(200);
});

module.exports = router;