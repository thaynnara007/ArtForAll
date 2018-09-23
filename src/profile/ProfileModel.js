var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var art = require('../art/ArtModel');

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

var profile = mongoose.model('profile', profileSchema);


//---------------PROFILE-------------------------//

/**
Represents a Profile
@constructor
@param {Object} info- The information about that user
@param {string} username - username
@param {int}  fllowing - number of people taht user is following
@param {int} id - The id of the profile
*/
exports.Profile = function( userName, following){

	this.username = userName;
	this.following = following;
}

var person = new this.Profile('miuda06', 40);
var anotherPerson = new this.Profile('onlok', 36);
var otherPerson =  new this.Profile('berkana',45);


exports.profiles = () => [person, anotherPerson, otherPerson]

/**
Returns a profile that has a specific username
@param {string} userName - username
@returns {Object}
*/
exports.getOneProfile = function(userName){

	var profile = this.profiles().filter(function(profile){

		return profile.username == userName;
	})

	return profile;
}
