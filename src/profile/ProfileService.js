const profile = require('./ProfileModel');
const User = require('../user/UserModel');
const cache = require('../cache/Cache');
const mongoose = require('mongoose');
const userUtil = require('../util/user');

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected at ProfilleController');
});

exports.getProfile = function (req, res) {

    var userName = req.params.name;

    User.User.findOne({ "userName": userName }, function (erro, user) {

        if (erro) {
            console.log(erro);
        }
        else if (user) {

            cache.put("visitedProfile", user.profile[0], 600000, function(erro){
                if (erro){
                    return console.log(erro);
                }
            })
            res.json(user.profile[0]);
        }
        else {
            res.status(404).json('there is not a user with this username');
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