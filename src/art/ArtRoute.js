const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const art = require('./Art');
const controller = require('./ArtController');


router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.get('/', controller.getAll); 

router.get('/:id', controller.getOne);

router.post('/', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
}); 

module.exports = router;