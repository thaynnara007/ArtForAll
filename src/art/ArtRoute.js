const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({mergeParams : true});
const service = require('./ArtService');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.get('/', service.getAll); 

router.get('/:artName', service.getOne);

router.post('/', service.post); 

module.exports = router;