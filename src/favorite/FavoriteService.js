const userUtil = require("../util/user");

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;
    
    userUtil.getUserProfile(userName, function(erro, userProfile){

        if(erro){
            return console.log(erro);
        }
        else if(userProfile){

            var favorites = userProfile.userFavoritesArts
            res.json(favorites);
        }
        else{
            res.status(404).json('This user do not have any favorite art');
        }
    })
}

exports.getOne = function (req, res) {

    var userName = req.params.userName;
    var artName = req.params.artName;

    userUtil.getUserProfile(userName, function(erro, userProfile){

        if(erro){
            return console.log(erro);
        }
        else if(userProfile){

            var favorites = userProfile.userFavoritesArts.filter(function(art){

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
            res.status(404).json("there is not a user with such name");
        }
    })
}

exports.post = function (req, res) {

    // var favorite = new art.Art(req.body);
    // dataBase.collection('favorite').insert(favorite)
    res.json(200);
}