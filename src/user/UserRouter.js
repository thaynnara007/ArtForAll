const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('./UserService');
const profileRouter = require('../profile/ProfileRoute');
const cors = require('cors');

router.use(bodyParser.json());

router.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    next();
})

router.use('/:userName/profile', profileRouter);

router.get('/:userName', cors(), service.getUser);

router.get('/:userName/info', cors(), service.getInfo);

module.exports = router;