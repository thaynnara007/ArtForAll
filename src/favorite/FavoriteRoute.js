const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router({ mergeParams:true });
const service = require('./FavoriteService');
const cors = require('cors');

router.use(bodyParser.json({limit: '2000mb'}));
router.use(bodyParser.urlencoded({limit: '2000mb', extended: true, parameterLimit:50000}));

router.use(function (req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	next();
});

/**
get all favorite arts from a user
*/
router.get('/', cors(),service.getAll);
/**
get a specific favorite art from a user
*/
router.get('/:artName',cors(), service.getOne);
/**
add one favorite art
*/
router.post('/',cors(), service.post);
router.delete('/', cors(), service.deleteOne)

module.exports = router;