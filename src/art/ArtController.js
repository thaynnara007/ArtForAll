const art = require('./Art');
const bodyParser = require('body-parser');

exports.getAll = function(req, res, next){

    var arts = art.arts() || 'you dont have any art';
    res.json(arts);

}

exports.getOne = function(req, res){

    var id = req.params.id;
    var oneArt = art.arts()[id] || "there is not a art with such id";
    res.json(oneArt);
}

//exports.put = funtion(req, res){}


//}

