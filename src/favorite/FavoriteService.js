const User = require('../user/UserModel');
const Profile = require('../profile/ProfileModel');
const userUtil = require("../util/user");
const cache = require('../cache/Cache');
const Constants = require('../util/Constants')
const OK = Constants.OK_STATUS;
const time = Constants.tenMinutes;
const notFound = Constants.NOT_FOUND_STATUS;
const BAD_REQUEST = Constants.BAD_REQUEST;
const Not_Authorized = Constants.Authorization_Required;
const DeletedSuccessful = Constants.DELETED_WITH_NO_CONTENT;
const InternalServerError = Constants.Internal_Server_Error;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    var user_profile = cache.get(userName);

    if(user_profile){

        var favorites = user_profile.userFavoritesArts
        res.json(favorites);
    }
    else if(userName != "me"){
        
        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                console.log(erro);
                res.status(InternalServerError);
            }
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

            if(err){
                console.log(err)
                res.status(InternalServerError);
            }
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

            if(erro){
                console.log(erro);
                res.status(InternalServerError);
            }
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

            if(err){
                console.log(err);
                res.status(InternalServerError);
            }
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
    
    art = req.body.art;
//    userloggedId = req.userId;
    var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

    User.User.findById(userId, (err, user) => {

        if (err){ 
            console.log(err)
            res.status(InternalServerError);
        }
        else if(user){

            user.profile.addFavoriteArt(art);
            profileId = user.profile._id;

            user.save((err) =>{

                if (err){ 
                    console.log(err);
                    res.status(BAD_REQUEST).json('Art was not saved');
                }else{

                    Profile.Profile.findById(profileId, (err, profile) =>{

                        if(err){
                            console.log(err)
                            res.status(InternalServerError)
                        }else if(profile){

                            profile.addFavoriteArt(art);

                            profile.save((err) =>{

                                if(err){
                                    console.log(err);
                                    res.status(BAD_REQUEST).json('Art was not saved');
                                }
                                else res.status(OK).json('Added successful');
                            })

                        }else res.status(notFound).json('Profile not found');
                    })
                }
            })
        }
        else res.status(notFound).json('User no found');
    })
}

exports.deleteOne = function(req, res){

    var artId = req.body.artId;
    var userName = req.params.userName;

    if (userName === "me"){

        //var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        User.User.findById(userId, (err, user) =>{

            if(err){
                console.log(err)
                res.status(InternalServerError);
            }else if(user){

                profile = user.profile;
                profileId = profile._id;
                profile.removeFavoriteArt(artId);

                user.save((err) =>{

                    if(err){
                        console.log(err);
                        res.status(BAD_REQUEST).json("Art was not removed");;
                    }else{
                        Profile.Profile.findById(profileId, (err, userProfile) =>{

                            if(err){
                                console.log(err);
                                res.status(InternalServerError);
                            }else if(userProfile){

                                userProfile.removeFavoriteArt(artId);

                                userProfile.save((err) =>{

                                    if(err){
                                        console.log(err);
                                        res.status(BAD_REQUEST).json("Art was not removed");
                                    }
                                    else res.status(DeletedSuccessful).json();
                                })
                            }else res.status(notFound).json('Profile not found')
                        })
                    }
                })
            }else res.status(notFound).json("User not found")
        })
    }else res.status(Not_Authorized).json('You do not have permission for it')
}