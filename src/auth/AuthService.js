//const express = require('express');
//const router = express.Router();
//const jwt = require("jsonwebtoken");
//const passport = require('./passport');
const Constants = require('../util/Constants')
//const BAD_REQUEST = Constants.BAD_REQUEST;
const NOT_FOUND = Constants.NOT_FOUND_STATUS;
//const authS = require('./authSecret.json');
const User = require('../user/UserModel');
const jwtToken = require('../util/jwtToken');

exports.login =  function(req, res){

    var email = req.body.email;
    var password = req.body.password;

    User.User.findOne({'information.email': email, 'informatioin.password': password}, function(err, user){

        if(err) return console.log(err);

        else if(!user) res.status(NOT_FOUND).json("email or password invalid");

        else res.send({

            user,
            token: jwtToken.generateToken({id: user.id})
        })
    })

}


/*

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
 */
//module.exports = router;