const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const uuid = require('uuid')
const passport = require('./passport');
const BadRequest = require('../util/Constants').BAD_REQUEST;

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

            var secretKey = uuid.v4();
            const token = jwt.sign(user, secretKey);

            return res.json({user, token})
        })
    })(req,res);    
})