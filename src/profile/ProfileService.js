const profile = require('./ProfileModel');
//const cache = require('../cache/Cache');
const userUtil = require('../util/user');


exports.getProfile = function (req, res) {

    var userName = req.params.userName;

    userUtil.getUserProfile(userName, function(erro, userProfile){

        if(erro){
            return console.log(erro);
        }
        else if(userProfile){

            res.json(userProfile);
        }
        else{
            res.status(400).json("There is not a user with this username");
        }
    })
}

exports.getFollowing = function (req, res) {

    names = ["clara", "gabriel", "igor", "sophia"];
    res.json(names);
}

exports.getFollowingUser = function (req, res) {

    var name = req.params.name;
    var userProfile = profile.getOneProfile(name);

    if (userProfile) {

        res.json(userProfile[0]);
    }
    else {

        res.status(404).json('You are not following this user');
    }
}

exports.postFollowing = function (req, res) {

    var require = req.body;
    res.send(JSON.stringify(require, null, 2));
}