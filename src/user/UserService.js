const User = require('./UserModel');
const Profile = require('../profile/ProfileModel');
const Info = require('../info/InfoModel');
const mongoose = require('mongoose');
const cache = require('../cache/Cache');
const constants = require('../util/Constants');
const time = constants.tenMinutes;
const OK = constants.OK_STATUS;
const notAuthorized = constants.Authorization_Required;
const CREATED = constants.CREATED;
const BAD_REQUEST = constants.BAD_REQUEST; 
const notFound = constants.NOT_FOUND_STATUS;
const InternalServerError = constants.Internal_Server_Error;
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at UserService');
});

exports.getUser = function(req, res){

    var userName = req.params.userName;

    User.User.findOne({ "userName":userName }, function(erro, user){

        if(erro){  
            console.log(err);
            res.status(InternalServerError);
        }
        else if (user) res.json(user);
        else res.status(notFound).json('there is not a user with this username');
    })
}

exports.getInfo = function(req, res){

    var userName = req.params.userName;

    if( userName == "me"){

        var userInfo = cache.get(userName + "Info");
      //  var userId = req.userId;
        var userId = mongoose.Types.ObjectId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        if (userInfo) res.json(userInfo);
        
        else{

            User.User.findById(userId, function(erro, user){

                if(erro){
                    console.log(erro);
                    res.status(InternalServerError);
                }   
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

    User.User.findOne({'information.email': email, 'information.password': password }, function(err, user){

        if(err){
            console.log(err)
            res.status(InternalServerError);
        }
        if(!user) res.status(notFound).json('User not found');
        else {
            
            var profileId = user.profile._id;
        
            Profile.Profile.deleteOne({_id: profileId}, function(err){
                if (err){
                    console.log(err);
                    res.status(InternalServerError);
                }
            })
        }
    })

    User.User.deleteOne({'information.email': email, 'information.password': password }, function(err){

        if (err){
            console.log(err);
            res.status(InternalServerError);
        }
        res.status(OK).json('User was deleted');
    })
}

exports.singUp = function(req, res){

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var newUserName = req.body.userName;
	var newEmail = req.body.email;
	var newPassword = req.body.password;

    var info = Info.create(firstName, lastName ,newAge, newUserName, newEmail, newPassword);
    var profile = Profile.create( new mongoose.Types.ObjectId(), newUserName, [], 0, [], 0, [], []);
    var newUser = User.create( newUserName, info, profile, []);

    newUser.save(function(err){
        if(err){       
            console.log(err);
            res.status(BAD_REQUEST).json('User not created');
        } else {

            profile.save(function(err){
                if(err){
                    console.log(err)
                    res.status(BAD_REQUEST).json('User not created');
                }
            }) 
            res.status(CREATED).json('User registered');
        }
    })
}



