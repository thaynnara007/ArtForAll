const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./UserController');
const profileRouter = require('../profile/ProfileRoute');


router.use(bodyParser.json());

router.use(function(req, res, next){

    res.setHeader('Content-Type', 'application/json');
    next();
})

router.use('/:name/profile', profileRouter);

router.get('/:name', controller.getUserProfile);

router.get('/:name/info', controller.getInfo);

module.exports = router;