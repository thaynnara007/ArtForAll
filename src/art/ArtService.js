const art = require('./ArtModel');
const mongoose = require('mongoose');
const cache = require('../cache/Cache');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });


var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

exports.getAll = function (req, res, next) {

    dataBase.collection('arts').find({}).toArray(function (err, arts) {

        if (err) {

            res.status(404).json('you dont have any art');
            return handleError(err);
        };

        res.json(arts);
    })
}

exports.getOne = function (req, res) {

    var artName = req.params.name;

    dataBase.collection('arts').findOne({ 'name': artName }, function (err, art) {

        if (err) {

            res.status(404).json('there is not a art with such name');
            console.log(err);
        }
        else {

            res.json(art);
        }
    })
}

exports.post = function (req, res) {

    //var art = new art.Art(req.body);
    //dataBase.collection('arts').insert(art);    
    res.status(200);
}






