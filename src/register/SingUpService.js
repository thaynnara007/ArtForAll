const Info = require('../info/InfoModel');
const Profile = require('../profile/ProfileModel');
const mongoose = require('mongoose');
const User = require('../user/UserModel');
const constants = require('../util/Constants');
const CREATED = constants.CREATED;
const BAD_REQUEST = constants.BAD_REQUEST; 

exports.singUp = function(req, res){

	var name = req.body.name;
	var age = req.body.age;
	var userName = req.body.userName;
	var email = req.body.email;
	var password = req.body.password;

	var info = new Info.Info({
        
        name: name,
        age: age,
        userName: userName,
        email: email,
        password: password
    })

    var profile = new Profile.Profile({

        _id: mongoose.Types.ObjectId(),
        userName: userName,
        following: [],
        followers: [],
        userArts: [],
        userFavoriteArts: []
    })

    var newUser = new User.User({

        userName: userName,
        information: [info],
        profile: [profile],
        timeLine: []
    })

    newUser.save(function(err){
        if(err){ 
                
            console.log(err);
            res.status(BAD_REQUEST).json('User not created');
        }
        else res.status(CREATED).json('User registered');
    })
}