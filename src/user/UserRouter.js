const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./UserService');
const profileRouter = require('../profile/ProfileRoute');


router.use(bodyParser.json());

router.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    next();
})

router.use('/:userName/profile', profileRouter);

router.get('/:userName', controller.getUser);

router.get('/:userName/info', controller.getInfo);

module.exports = router;