const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('./UserService');
const profileRouter = require('../profile/ProfileRoute');
const cors = require('cors');
const passport = require('passport');
const profileUserRouter = require('./profileUserRouter');
const authValidation = require('../auth/authValidation');

router.use(bodyParser.json());
router.use(authValidation);
/*
router.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    next();
})*/

router.use('/:userName/profile', profileRouter);
//router.use('/profile', passport.authenticate('jwt',{session: false}), profileUserRouter);

router.get('/:userName', cors(), service.getUser);

router.get('/:userName/info', cors(), service.getInfo);

module.exports = router;