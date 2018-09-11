const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const art = require('./Art');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});


router.get('/', (req, res) =>{
	
	res.json(art.arts());
}); 

router.get('/:id', (req, res) =>{ 

	var id = req.params.id
	res.json(art.arts()[id]);
});

router.post('/', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
});

router.get('/favorite', (req, res) =>{

	res.json(art.favorites());
});

router.get('/favorite/:id', (req,res) =>{

	var id = req.params.id
	res.json(art.favorites()[id]);
});

router.post('/favorite', (req, res) =>{

	res.send(JSON.stringify(req.body, null, 2));
});

module.exports = router;