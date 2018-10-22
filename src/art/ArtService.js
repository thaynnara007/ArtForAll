const cache = require('../cache/Cache');
const userUtil = require('../util/user');
const Art = require('./ArtModel');
const User = require('../user/UserModel');
const Profile = require('../profile/ProfileModel');
const constants = require('../util/Constants');
const time = constants.tenMinutes;
const CREATED = constants.CREATED;
const notFound = constants.NOT_FOUND_STATUS;
const notAuthorized = constants.Authorization_Required;
const RemoveSuccessful = constants.DELETED_WITH_NO_CONTENT;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    var user_profile = cache.get(userName);

    if(user_profile){
       
        var arts = user_profile.userArts;
        res.json(arts);
    }
    else if(userName != "me"){

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro) return console.log(erro);

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

            if(err) console.log(err)
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

            if(erro) return console.log(erro);

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

            if(err) console.log(err)
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
        var imgLink = req.body.imgLink;
        var tags = req.body.tags;
        var newArt = Art.create(artName, imgLink, tags);
        //  var userId = req.userId;
        var userId = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

        User.User.findById(userId, function(err, user){

            if(err) console.log(err);
            else if(user){

                let profileId = user.profile._id;
                user.profile.addArt(newArt);
                user.save(function(err){

                    if (err) console.log(err);
                    else {
                        
                        Profile.Profile.findById(profileId, function(err, profile){

                            if(err) console.log(err)
                            else if(profile){

                                profile.addArt(newArt);
                                profile.save(function(err){
                                    if (err) console.log(err)
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

    var artId = req.body.id;
    console.log('ARTID:', artId);
    var userName = req.params.userName;
   // var userId = req.userId;
   var id = userUtil.generateId("5bc37bafa4249f2029ea0471"); // (it's used for test)

    if(userName == "me"){

        User.User.findById(id, function(err, user){

            if(err) console.log(err);
            else if(user){

                var profileId = user.profile._id;
                user.profile.removeArt(artId);
                user.save(function(err){
                    
                    if (err) console.log(err)
                    else{

                        Profile.Profile.findById(profileId, function(err, profile){

                            if(err) console.log(err);
                            else if(profile){ 

                                profile.removeArt(artId);
                                profile.save(function(err){

                                    if(err) console.log(err)
                                    else {
                                        console.log('Here');
                                        res.status(204).json('etdty');}
                                })
                            }else res.status(notFound).json('Profile not founded');
                        })
                    }
                })
            }else res.status(notFound).json('User ot founded');
        })
    }else res.status(notAuthorized).json('You do not have permission for it');
    

}





