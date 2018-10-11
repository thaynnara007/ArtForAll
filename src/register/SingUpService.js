const express = require('express');
//const router = express.Router();
//const bodyParser = require('body-parser');
const Info = require('../info/InfoModel');
const Profile = require('../profile/ProfileModel');
const mongoose = require('mongoose');
const User = require('../user/UserModel');
const constants = require('../util/Constants');
const CREATED = constants.CREATED;
const BAD_REQUEST = constants.BAD_REQUEST; 

//router.use(bodyParser.json());


exports.singUp = function(req, res){

	var name = req.name;
	var age = req.age;
	var userName = req.userName;
	var email = req.email;
	var password = req.password;

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

    if( newUser ){

        newUser.save(function(err){
            if(err) return console.log(err);
        })

        res.status(CREATED).json('User registered');
    }
    else res.status(BAD_REQUEST).json('User not created');
}