const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams: true });
const artRouter = require('../art/ArtRoute');
const favoriteRoute = require('../favorite/FavoriteRoute');
const service = require('./ProfileService');
const cors = require('cors')

router.use(bodyParser.json());
router.use(function (req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	next();
});
router.use('/myarts', artRouter);
router.use('/favorite', favoriteRoute);

router.get('/',cors(), service.getProfile);
router.get('/following', cors(),service.getFollowing);
router.get('/following/:name',cors(), service.getFollowingUser);
router.post('/following',cors(), service.postFollowing);

module.exports = router;