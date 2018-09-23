const art = require('../art/ArtModel');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

exports.getAll = function(req, res, next){


    dataBase.collection('favorite').find({}).toArray(function(err, favorites){

        if(err){

            res.status(404).json('You do not have any favorite art');
            console.log(err);
        }else{
        
            res.json(favorites);
        }
    })

}

exports.getOne = function(req, res){

    var artName = req.params.name;

    dataBase.collection('favorite').findOne({name: artName}, function(err, favorite){

        if(err){

            res.status(404).json("there is not a favorite art with such name");
            console.log(err);
        }else{
          
            res.json(favorite);
        }
    })
}

exports.post = function(req, res){

      // var favorite = new art.Art(req.body);
      // dataBase.collection('favorite').insert(favorite)
      res.json(200);
    }