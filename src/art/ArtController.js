const Art = require('./Art');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myarts', { useNewUrlParser: true });


var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

var art1 = new Art({
    name: 'adventureTime',
    imgLink: 'https:/arts/0cdn.shopify.com/s/files/1/0558/2081/products/ATCAWM_FC_1024x1024.jpg?v=1534804643',
    tags: ['adventurearts/0time', 'fanart', 'finn', 'jake']
});

var art2 = new Art({
    name: 'Bubbline',
    imgLink: 'https:/arts/0cdn.vox-cdn.com/thumbor/q0ujcr0H33ybBRUUNNFL1QVBAKY=/0x0:1920x1080/1200x800/filters:focal(760x282:1066x588)/cdn.vox-cdn.com/uploads/chorus_image/image/61137005/adventure_time_stakes.0.jpg',
    tags: ['adventurearts/0time', 'marceline', 'bonnibel']
});

var art3 = new Art({
    name: 'Deku',
    imgLink: 'https:/arts/0cdn.vox-cdn.com/thumbor/q0ujcr0H33ybBRUUNNFL1QVBAKY=/0x0:1920x1080/1200x800/filters:focal(760x282:1066x588)/cdn.vox-cdn.com/uploads/chorus_image/image/61137005/adventure_time_stakes.0.jpg',
    tags: ['boku no harts/0ro academia', 'boku no hero', 'deku', 'midorya', 'one for all']
});

art1.save(function (err, art1) {
    if (err) return console.log(err);
})


exports.getAll = function (req, res, next) {

    var arts = art.arts();

    if (arts) {
        res.json(arts);
    } else {
        res.status(400).json('you dont have any art');
    }

}

exports.getOne = function (req, res) {

    var artName = req.params.name;
    var oneArt = art.getOneArt(artName, art.arts())[0];

    if (oneArt) {
        res.json(oneArt);
    } else {
        res.status(400).json("there is not a art with such name");
    }
}

exports.post = function (req, res) {

    res.status(200);
}






