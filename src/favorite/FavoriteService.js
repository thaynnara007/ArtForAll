const Profile = require('../profile/ProfileModel');
const userUtil = require("../util/user");
const cache = require('../cache/Cache');
const Constants = require('../util/Constants')
const OK = Constants.OK_STATUS;
const time = Constants.tenMinutes;
const notFound = Constants.NOT_FOUND_STATUS;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    var user_profile = cache.get(userName);

    if(user_profile){

        var favorites = user_profile.userFavoritesArts
        res.json(favorites);
    }
    else if(userName != "me"){
        
        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro)  return console.log(erro);
            
            else if(userProfile){

                cache.put(userName, userProfile, time);
                var favorites = userProfile.userFavoritesArts
                res.json(favorites);
            }
            else  res.status(notFound).json('This user do not have any favorite art');
        })
    }
    else{

    //  var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        userUtil.getUserProfileById(userId, function(err, profile){

            if(err) console.log(err)
            else{

                cache.put(userName, profile, time);
                res.json(profile.userFavoritesArts);
            }
        })
    }
}

exports.getOne = function (req, res) {

    var userName = req.params.userName;
    var artName = req.params.artName;
    var user_profile = cache.get(userName);

    if (user_profile){

        var favorites = user_profile.userFavoritesArts.filter(function(art){
            return art.name == artName;
        })
        if (favorites != false)  res.json(favorites);
        else res.status(404).json("there is not a favorite art with such name");
        
    }
    else if(userName != "me"){

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro)  return console.log(erro);
            
            else if(userProfile){

                cache.put(userName, userProfile, time);
                var favorites = userProfile.userFavoritesArts.filter(function(art){
                    return art.name == artName;
                })
                if (favorites != false)  res.json(favorites);
                else  res.status(notFound).json("there is not a favorite art with such name");  
            }
            else res.status(notFound).json("there is not a user with such name");
        })
    }
    else{

    //  var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        userUtil.getUserProfileById(userId, function(err, profile){

            if(err) console.log(err);
            else{

                cache.put(userName, profile, time);
                var favorites = profile.userFavoritesArts.filter(function(art){
                    return art.name === artName;
                })
                if (favorites != false)  res.json(favorites);
                else  res.status(notFound).json("there is not a favorite art with such name");
            }
        })
    }
}

exports.post = function (req, res) {
    
    profile_id = req.body.profileId;
    art_id = req.body.artId;
//    userloggedId = req.userId;
    var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

    Profile.Profile.findById(profile_id, function(err, profile){

        if (err) console.log(err)
        else if(profile){

            var art = profile.getOneArt(art_id);

            userUtil.getUserProfileById(userId, (err, userLoggedProfile) =>{

                if (err) console.log(err);
                else if(userLoggedProfile){
                    
                    userLoggedProfile.addFavoriteArt(art);
                    res.status(OK).json('Add successful');
                }
                else res.status(notFound).json('Profile not founded');
            })
        }
        else res.status(notFound).json('Art not founded')
    })
}