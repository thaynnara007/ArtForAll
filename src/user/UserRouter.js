const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('./UserService');
const profileRouter = require('../profile/ProfileRoute');


router.use(bodyParser.json());

router.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    next();
})

router.use('/:userName/profile', profileRouter);

router.get('/:userName', service.getUser);

router.get('/:userName/info', service.getInfo);

module.exports = router;