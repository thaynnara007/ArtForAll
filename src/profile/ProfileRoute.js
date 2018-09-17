const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const artRouter = require('../art/ArtRoute');
const favoriteRoute = require('../art/FavoriteRoute');
const profile = require('./Profile.js')
const controller = require('./ProfileController');

router.use(bodyParser.json());

router.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

router.use('/myarts', artRouter);
router.use('/favorite', favoriteRoute);

router.get('/following', controller.getFollowing);

router.get('/following/:name', controller.getFollowingUser);

router.post('/following', controller.postFollowing);

module.exports = router;