const Info = require('../info/InfoModel');
const Profile = require('../profile/ProfileModel');
const mongoose = require('mongoose');
const User = require('../user/UserModel');
const constants = require('../util/Constants');
const CREATED = constants.CREATED;
const BAD_REQUEST = constants.BAD_REQUEST; 

exports.singUp = function(req, res){

	var newName = req.body.name;
	var newAge = req.body.age;
	var newUserName = req.body.userName;
	var newEmail = req.body.email;
	var newPassword = req.body.password;

	var info = new Info.Info({
        
        name: newName,
        age: newAge,
        userName: newUserName,
        email: newEmail,
        password: newPassword
    })

    var profile = new Profile.Profile({

        _id: mongoose.Types.ObjectId(),
        userName: newUserName,
        following: [],
        followers: [],
        userArts: [],
        userFavoriteArts: []
    })

    var newUser = new User.User({

        userName: newUserName,
        information: info,
        profile: profile,
        timeLine: []
    })

    newUser.save(function(err){
        if(err){ 
                
            console.log(err);
            res.status(BAD_REQUEST).json('User not created');
        }
        else {

            profile.save(function(err){
                if(err) return console.log(err)
            }) 
            res.status(CREATED).json('User registered');
        }
    })
}