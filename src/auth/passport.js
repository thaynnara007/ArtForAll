const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const user = require('../user/UserModel');
const passportJWT = require('passport-jwt');
const authS = require('./authSecret.json');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({

        emailFild: 'email',
        passwordFild: 'password'
    },
        function(email, password, callback){

            return user.User.findOne({ 'information.email': email, 'information.password': password })
                .then(user =>{

                    if(!user) return callback(null,false,{ message: 'Incorrect email or password.'});
                
                    return callback(null, true, { message: "Logged in successfully"});
                })
                .catch(err => callback(err));
    }
))

passport.use(new JWTStrategy({

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: authS.secret
    },
    function(jwtPaylod, callback){

        return user.User.findOneById(jwtPaylod.id)
            .then(use =>{
                return callback(null, user);
            })
            .catch( err =>{
                return callback(err);
            })
    }
))