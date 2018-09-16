const art = require('./Art');

exports.getAll = function(req, res, next){

    var favorites = art.favorites(); 

    if(favorites){
        res.json(favorites);
    }else{
        res.status(400).json('you dont have any favorite art');
    }

}

exports.getOne = function(req, res){

    var artName = req.params.name;
    var oneArt = art.getOneArt(artName, art.favorites())[0];

    if(oneArt){
        res.json(oneArt);
    }else{
        res.status(400).json("there is not a art with such name");
    }
}

exports.post = function(req, res){

       res.status(200);
    }