const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./ArtService');


router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.get('/', controller.getAll); 

router.get('/:name', controller.getOne);

router.post('/', controller.post); 

module.exports = router;