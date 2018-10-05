//const art = require('./ArtModel');
const mongoose = require('mongoose');
//const cache = require('../cache/Cache');
const userUtil = require('../util/user');

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
}

exports.post = function (req, res) {

    //var art = new art.Art(req.body);
    //dataBase.collection('arts').insert(art);    
    res.status(200);
}






