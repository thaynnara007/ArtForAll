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
router.post('/', cors(), service.post); 
router.delete('/', cors(), service.deleteArt);
router.put('/:artName', cors(), service.edit);

module.exports = router;