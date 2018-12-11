const cache = require('../cache/Cache');
const userUtil = require('../util/user');
const Art = require('./ArtModel');
const Image = require('../image/imageModel');
const User = require('../user/UserModel');
const Profile = require('../profile/ProfileModel');
const constants = require('../util/Constants');
const fs = require('fs');
const OK = constants.OK_STATUS;
const time = constants.tenMinutes;
const CREATED = constants.CREATED;
const notFound = constants.NOT_FOUND_STATUS;
const BAD_REQUEST = constants.BAD_REQUEST;
const notAuthorized = constants.Authorization_Required;
const DeletedSuccessful = constants.DELETED_WITH_NO_CONTENT;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    var user_profile = cache.get(userName);

    if(user_profile){
       
        var arts = user_profile.userArts;
        res.json(arts);
    }
    else if(userName != "me"){

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                console.log(erro);
                res.status(InternalServerError);
            }
            else if(userProfile){

                var arts = userProfile.userArts;
                cache.put(userName, userProfile, time);
                res.json(arts);
            }
            else res.status(notFound).json('This user dont have any art');
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
                res.json(profile.userArts);
            }
        })
    }    
}

exports.getOne = function (req, res) {

    var userName = req.params.userName;
    var artName = req.params.artName;
    var user_profile = cache.get(userName);

    if(user_profile){
        
        var arts = user_profile.userArts.filter(function(art){
            return art.name == artName;
        })
        if(arts != false) res.json(arts);
        else res.status(notFound).json("There is not a art with such name");
    }
    else if (userName != "me"){

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                console.log(erro);
                res.status(InternalServerError);
            }
            else if(userProfile){

                cache.put(userName, userProfile, time);
                var arts = userProfile.userArts.filter(function(art){
                    return art.name === artName;
                })
                if (arts != false) res.json(arts);
                else  res.status(notFound).json("There is not a art with such name");
            }
            else  res.status(notFound).json('there is not a user with this username');
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
                var arts = profile.userArts.filter(function(art){
                    return art.name === artName;
                })
                if (arts != false) res.json(arts);
                else  res.status(notFound).json("There is not a art with such name");
            }
        })
    }
}

exports.post = function (req, res) {

    var userName = req.params.userName;

    if( userName === "me"){

        var artName = req.body.name;
        var collectioon = req.body.collectioon;
        var description = req.body.description;
        var tags = req.body.tags;
        var _id = req.body._id;

        var newArt = Art.create(artName, tags, _id, collectioon, description);
        //  var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        User.User.findById(userId, function(err, user){

            if(err){
                console.log(err);
                res.status(InternalServerError);
            }
            else if(user){

                let profileId = user.profile._id;
                user.profile.addArt(newArt);
                user.save(function(err){

                    if (err){
                        console.log(err);
                        res.status(BAD_REQUEST).json('Art was not saved');
                    }
                    else {
                        Profile.Profile.findById(profileId, function(err, profile){

                            if(err){
                                console.log(err)
                                res.status(InternalServerError);
                            }
                            else if(profile){

                                profile.addArt(newArt);
                                profile.save(function(err){
                                    if (err){
                                        console.log(err)
                                        res.status(BAD_REQUEST).json('Art was not saved');
                                    }
                                    else res.status(CREATED).json('New art created');
                                })
                            }else res.status(notFound).json('profile not founded')
                        })
                    }
                })
            }else res.status(notFound).json('User not founded');
        })
    }else res.status(notAuthorized).json('You do not have permission for it')
}

exports.deleteArt = function(req, res){

    var artId = req.body.artId;
    var userName = req.params.userName;

    if (userName === "me"){

        //  var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        User.User.findById(userId, function(err, user){

            if (err){
                console.log(err)
                res.status(InternalServerError);
            }
            else if (user){

                user.profile.removeArt(artId);
                let profileId = user.profile._id;

                user.save(function(err){
                    if (err){
                        console.log(err);
                        res.status(BAD_REQUEST).json('Art was not deleted');
                    }
                    else{

                        Profile.Profile.findById(profileId, function(err, profile){

                            if(err){
                                console.log(err);
                                res.status(InternalServerError);
                            }
                            else if(profile){

                                profile.removeArt(artId);
                                profile.save(function(err){

                                    if(err){
                                        console.log(err);
                                        res.status(BAD_REQUEST).json('Art was not deleted');
                                    }
                                    else  res.status(DeletedSuccessful).json();
                                })
                            }else res.status(notFound).json('Profile not found');
                        })
                    }
                })
            }else res.status(notFound).json('User not found');
        })
    }else res.status(notAuthorized).json('You do not have permission for it');
}

exports.edit = function(req,res){

    res.status(OK).json("Art edited successful");
}





