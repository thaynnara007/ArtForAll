const profile = require('../profile/ProfileModel');
const info = require('../info/InfoModel');
const art = require('../art/ArtModel');
const userAbstract = require('./UserAbstract');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

var userSchema = new Schema({

    userName:{
        type: String
    },
    information:[info.infoSchema],
    profile:[profile.profileSchema],
    timeLine:[art.artSchema]

})

var User = mongoose.model('User', userSchema);

module.exports = {userSchema, User}
