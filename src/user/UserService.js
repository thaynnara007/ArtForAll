const User = require('./UserModel');
const mongoose = require('mongoose');
const cache = require('../cache/Cache');
const time = require('../util/Constants').tenMinutes;

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at UserController');
});

exports.getUser = function(req, res){

    var userName = req.params.userName;

    User.User.findOne({ "userName":userName }, function(erro, user){

        if(erro){
             console.log(err);
        }
        else if (user){
            
            res.json(user);
        }
        else{
            res.status(404).json('there is not a user with this username');
        }
    })
}

exports.getInfo = function(req, res){

    var userName = req.params.userName;
    var userInfo = cache.get(userName + "Info");

    if (userInfo){
        res.json(userInfo);
    }
    else{

        User.User.findOne({ "userName": userName}, function(erro, user){

            if(erro){
                console.log(erro);
            }
            else if(user){

                var info = user.information[0];
                
                cache.put(userName + "Info", info, time);
                res.json(info);
            }
            else{
                res.status(404).json('there is not a user with this username');
            }
        })
    }
}
