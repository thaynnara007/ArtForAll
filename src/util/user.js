const User = require('../user/UserModel');
const mongoose = require('mongoose');

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at util/user');
});

exports.getUserProfile = function(userName, callback){

     User.User.findOne({ "userName":userName }, function(erro, user){
            
        if(erro){
             callback(erro, null)
        }
        else if(user){

            profile = user.profile[0];
            callback(null, profile);
            }        
    })

}
