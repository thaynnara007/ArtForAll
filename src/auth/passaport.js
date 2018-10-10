const passaport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const user = require('../user/UserModel');

passaport.use(new LocalStrategy({

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