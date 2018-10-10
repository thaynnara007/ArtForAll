const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require('./passport');
const BadRequest = require('../util/Constants').BAD_REQUEST;
const authS = require('./authSecret.json');

router.post('/login', function(req, res, next){

    passport.authenticate('local', { session: false }, (err, user, info) =>{

        if(err || !user){

            return res.status(BadRequest).json({
                message: 'Something got wrong',
                user: user
            });
        }

        req.login(user, {session: false}, (err) =>{

            if(err) res.send(err);

            const token = jwt.sign(user, authS.secret);

            return res.json({user, token})
        })
    })(req,res);    
})

module.exports = router;