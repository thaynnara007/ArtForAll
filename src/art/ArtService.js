//const art = require('./ArtModel');
const mongoose = require('mongoose');
//const cache = require('../cache/Cache');
const userUtil = require('../util/user');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

/*
var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
}); */

exports.getAll = function (req, res, next) {

    var userName = req.params.userName;

    userUtil.getUserProfile(userName, function(erro, userProfile){

        if(erro){
            return console.log(erro);
        }
        else if(userProfile){

            var arts = userProfile.userArts;
            res.json(arts);
        }
        else{
            res.status(404).json('This user dont have any art');
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

            arts = userProfile.userArts.filter(function(art){

                return art.name === artName;
            })
            res.json(arts);
        }
        else{
            res.status(404).json('there is not a art with such name');
        }
    })

    /*
    var artName = req.params.name;

    dataBase.collection('arts').findOne({ 'name': artName }, function (err, art) {

        if (err) {

            res.status(404).json('there is not a art with such name');
            console.log(err);
        }
        else {

            res.json(art);
        }
    }) */
}

exports.post = function (req, res) {

    //var art = new art.Art(req.body);
    //dataBase.collection('arts').insert(art);    
    res.status(200);
}






