const profile = require('../profile/ProfileModel');
const info = require('../info/InfoModel');
const art = require('../art/ArtModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

var userSchema = new Schema({

    information:[info.infoSchema],
    profile:[profile.profileSchema]

})

var User = mongoose.model('User', userSchema);


exports.users = () => [user1, user2];

exports.getUser = function(userName){

    var user = this.users().filter(function(user){

        return user.info.username == userName;
    })

    return user;
}

exports.getUserProfile = function(userName){

    var user = this.getUser(userName)[0];

    if (user){
        return user.profile;
    }else{
        return user;
    }
}

exports.getUserInfo = function(userName){

    var user = this.getUser(userName)[0];

    if(user){

        return user.info;
    }
    else{

        return user;
    }
}