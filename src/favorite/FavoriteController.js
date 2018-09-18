const art = require('../art/Art');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/favorite', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

var art3 = new art.Art({
    name: 'Deku',
    imgLink: 'https://i.pinimg.com/originals/a0/0d/cb/a00dcb7631dffe60efc0e2cd7f742eaa.jpg',
    tags: ['boku no hero academia', 'boku no hero', 'deku', 'midorya', 'one for all']
});

var art4 = new art.Art({
    name:'erin',
    imgLink:'http://www.nerdtrip.com.br/wp-content/uploads/2017/09/Shingeki-no-Kyojin-segunda-temporada-2017-2.jpg',
    tags: ['shingeki no kyojin', 'attack on titan', 'erin', 'tita', 'wall']
});
        
/*
art.Art.find(function(err, fav){

    if(err) return console.log(err);
    console.log(fav);
})*/


exports.getAll = function(req, res, next){


    art.Art.find(function(err, favorites){

        if(err){

            res.status(400).json('You do not have any favorite art');
            console.log(err);
        }else{

            res.json(favorites);
        }
    })

}

exports.getOne = function(req, res){

    var artName = req.params.name;

    art.Art.find({name: artName}, function(err, favorite){

        if(err){

            res.status(400).json("there is not a favorite art with such name");
            console.log(err);
        }else{

            res.json(favorite[0]);
        }
    })
}

exports.post = function(req, res){

       res.status(200);
    }