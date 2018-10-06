const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams:true });
const controller = require('./FavoriteService');

router.use(bodyParser.json());

router.use(function (req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	next();
});

/**
get all favorite arts from a user
*/
router.get('/', controller.getAll);
/**
get a specific favorite art from a user
*/
router.get('/:artName', controller.getOne);
/**
add one favorite art
*/
router.post('/', controller.post);

module.exports = router;