const User = require('../user/UserModel');
const cache = require('../cache/Cache');
const mongoose = require('mongoose');
const tenMin = 600000;

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at ProfilleController');
});

exports.getUser = function(userName){

    var profile = cache.get('visitedProfile');

    if(profile && profile.userName === userName){
        
        return profile;
    }
    else{

        var userName = req.params.userName;

        User.User.findOne({ "userName":userName }, function(erro, user){
            
            if(erro){
                return console.log(erro);
            }
            else if(user){

                profile = user.profile[0];
                cache.put('visitedProfile', profile, tenMin);
            }
        })
        return profile;
    }
}