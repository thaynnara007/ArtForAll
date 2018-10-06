const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true });
const artRouter = require('../art/ArtRoute');
const favoriteRoute = require('../favorite/FavoriteRoute');
const service = require('./ProfileService');

router.use(bodyParser.json());

router.use(function (req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	next();
});

router.use('/myarts', artRouter);
router.use('/favorite', favoriteRoute);

router.get('/', service.getProfile);

router.get('/following', service.getFollowing);

router.get('/following/:name', service.getFollowingUser);

router.post('/following', service.postFollowing);

module.exports = router;