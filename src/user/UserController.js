const User = require('./UserModel');
const mongoose = require('mongoose');

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at UserController');
});

exports.getUser = function(req, res){

    var userName = req.params.name;

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

    var userName = req.params.name;
    
    User.User.findOne({ "userName": userName}, function(erro, user){

        if(erro){
            console.log(erro);
        }
        else if(user){
            res.json(user.information[0]);
        }
        else{
            res.status(404).json('there is not a user with this username');
        }
    })
}
