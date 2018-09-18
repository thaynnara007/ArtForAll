const art = require('./Art');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myarts', { useNewUrlParser: true });


var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

exports.getAll = function (req, res, next) {

    art.Art.find( function(err, arts){

        if (err){ 
            
            res.status(404).json('you dont have any art');
            return handleError(err);
        };
        
        res.json(arts);
    })
}

exports.getOne = function (req, res) {

    var artName = req.params.name;
  
    art.Art.find({'name': artName}, function(err,art){
 
        if(err){

            res.status(404).json('there is not a art with such name');
            console.log(err);
        }
        else{
            
            res.json(art[0]);
        }
    })
} 

exports.post = function (req, res) {

    res.status(200);
} 






