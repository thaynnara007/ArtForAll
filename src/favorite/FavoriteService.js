const userUtil = require("../util/user");
const time = require('../util/Constants').tenMinutes;
const cache = require('../cache/Cache');
const OK = require('../util/Constants').OK_STATUS;
const notFound = require('../util/Constants').NOT_FOUND_STATUS;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    var user_profile = cache.get(userName);

    if(user_profile){

        var favorites = user_profile.userFavoritesArts
        res.json(favorites);
    }
    else{
        
        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                return console.log(erro);
            }
            else if(userProfile){

                cache.put(userName, userProfile, time);
                var favorites = userProfile.userFavoritesArts
                res.json(favorites);
            }
            else{
                res.status(notFound).json('This user do not have any favorite art');
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
        if (favorites != false){
            res.json(favorites);
        }
        else{
            res.status(404).json("there is not a favorite art with such name");
        }
    }
    else{

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                return console.log(erro);
            }
            else if(userProfile){

                cache.put(userName, userProfile, time);
                var favorites = userProfile.userFavoritesArts.filter(function(art){
                    return art.name == artName;
                })
                if (favorites != false){
                    res.json(favorites);
                }
                else{
                    res.status(notFound).json("there is not a favorite art with such name");
                }
            }
            else{
                res.status(notFound).json("there is not a user with such name");
            }
        })
    }
}

exports.post = function (req, res) {

    // var favorite = new art.Art(req.body);
    // dataBase.collection('favorite').insert(favorite)
    res.json(OK);
}