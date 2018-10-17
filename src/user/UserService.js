const User = require('./UserModel');
const mongoose = require('mongoose');
const cache = require('../cache/Cache');
const constants = require('../util/Constants');
const time = constants.tenMinutes;
const OK = constants.OK_STATUS;
const notAuthorized = constants.Authorization_Required;
const notFound = require('../util/Constants').NOT_FOUND_STATUS;
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at UserService');
});

exports.getUser = function(req, res){

    var userName = req.params.userName;

    User.User.findOne({ "userName":userName }, function(erro, user){

        if(erro)   console.log(err);
        else if (user) res.json(user);
        else res.status(notFound).json('there is not a user with this username');
    })
}

exports.getInfo = function(req, res){

    var userName = req.params.userName;

    if( userName === "me"){

        var userInfo = cache.get(userName + "Info");
        var userId = req.userId;
      //  var userId = mongoose.Types.ObjectId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        if (userInfo)  res.json(userInfo);
        
        else{

            User.User.findById(userId, function(erro, user){

                if(erro)  console.log(erro);
                
                else if(user){

                    var info = user.information;
                    cache.put(userName + "Info", info, time);
                    res.json(info);
                }
                else  res.status(notAuthorized).json('You do not have permission for it');
            })
        }
    }
    else  res.status(notAuthorized).json('You do not have permission for it');
}

exports.deleteUser = function(req, res){

    var email = req.body.email;
    var password = req.body.password;

    User.User.deleteOne({'information.email': email, 'information.password': password }, function(err){

        if (err) return console.log(err);

        res.status(OK).json('User was deleted');
    })


}



