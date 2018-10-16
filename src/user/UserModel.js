const profile = require('../profile/ProfileModel');
const info = require('../info/InfoModel');
const art = require('../art/ArtModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    userName:{
        type: String
    },
    information:info.infoSchema,
    profile: profile.profileSchema,
    timeLine:[art.artSchema]
})

var User = mongoose.model('User', userSchema);

module.exports = {userSchema, User}
