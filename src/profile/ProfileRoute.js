const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const artRouter = require('../art/ArtRoute');
const favoriteRoute = require('../favorite/FavoriteRoute');
const controller = require('./ProfileController');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.use('/myarts', artRouter);
router.use('/favorite', favoriteRoute);

router.get('/', (req, res) =>{

	res.json('Hello profile');
} )

router.get('/following', controller.getFollowing);

router.get('/following/:name', controller.getFollowingUser);

router.post('/following', controller.postFollowing);

module.exports = router;