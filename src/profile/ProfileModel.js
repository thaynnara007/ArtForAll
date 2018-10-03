const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });


var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

var profileSchema = new Schema({

	userName:{
		type: String,
		required: true
	},
	following:{
		type:Number
	},
	userArts:[art.artSchema],
	userFavoritesArts:[art.artSchema]
})

var Profile = mongoose.model('Profile', profileSchema);
module.exports = {Profile, profileSchema}


//---------------PROFILE-------------------------//

/**
Represents a Profile
@constructor
@param {Object} info- The information about that user
@param {string} username - username
@param {int}  fllowing - number of people taht user is following
@param {int} id - The id of the profile
*/
/*
exports.Profile = function( userName, following){

	this.username = userName;
	this.following = following;
}
*/


//exports.getrofiles = () => [person, anotherPerson, otherPerson]

/**
Returns a profile that has a specific username
//@param {string} userName - username
@returns {Object}
*/
/*
exports.getOneProfile = function(userName){

	var profile = this.profiles().filter(function(profile){

		return profile.username == userName;
	})

	return profile;
} */
