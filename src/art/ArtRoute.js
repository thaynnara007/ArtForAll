const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({mergeParams : true});
const service = require('./ArtService');
const cors = require('cors')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.get('/',cors(), service.getAll); 
router.get('/:artName',cors(), service.getOne);
router.post('/', service.post); 

module.exports = router;