const cache = require('../cache/Cache');
const userUtil = require('../util/user');
const time = require('../util/Constants').tenMinutes;
const OK = require('../util/Constants').OK_STATUS;
const notFound = require('../util/Constants').NOT_FOUND_STATUS;

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

    //var art = new art.Art(req.body);
    //dataBase.collection('arts').insert(art);    
    res.status(OK);
}






