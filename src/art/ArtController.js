const art = require('./Art');
const bodyParser = require('body-parser');

exports.getAll = function(req, res, next){

    var arts = art.arts(); 

    if(arts){
    res.json(arts);
    }else{
        res.status(400).json('you dont have any art');
    }

}

exports.getOne = function(req, res){

    var artName = req.params.name;
    var oneArt = art.getOneArt(artName)[0]; 

    if(oneArt){
        res.json(oneArt);
    }else{
        res.status(400).json("there is not a art with such id");
    }
}

exports.post = function(req, res){

       res.status(200);
    }






