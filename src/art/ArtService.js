const cache = require('../cache/Cache');
const userUtil = require('../util/user');
const time = require('../util/Constants').tenMinutes;

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;

    var user_profile = cache.get(userName);

    if(user_profile){
       
        var arts = user_profile.userArts;
        console.log(arts);
        res.json(arts);
    }
    else{

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                return console.log(erro);
            }
            else if(userProfile){

                var arts = userProfile.userArts;
                cache.put(userName, userProfile, time);
                res.json(arts);
            }
            else{
                res.status(404).json('This user dont have any art');
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
        if(arts != false){
            res.json(arts);
        }
        else{
            res.status(404).json("There is not a art with such name");
        }
    }
    else{

        userUtil.getUserProfile(userName, function(erro, userProfile){

            if(erro){
                return console.log(erro);
            }
            else if(userProfile){

                cache.put(userName, userProfile, time);
                arts = userProfile.userArts.filter(function(art){

                    return art.name === artName;
                })
            
                if (arts != false){
                    res.json(arts);
                }
                else{
                    res.status(404).json("There is not a art with such name");
                }
            }
            else{
                res.status(404).json('there is not a user with this username');
            }
        })
    }
}

exports.post = function (req, res) {

    //var art = new art.Art(req.body);
    //dataBase.collection('arts').insert(art);    
    res.status(200);
}






