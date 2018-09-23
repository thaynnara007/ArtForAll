const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');

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

var art1 = new art.Art({
    name: 'adventureTime',
    imgLink: 'https://cdn.shopify.com/s/files/1/0558/2081/products/ATCAWM_FC_1024x1024.jpg?v=1534804643',
    tags: ['adventuretime', 'fanart', 'finn', 'jake']
});

var art2 = new art.Art({
    name: 'Bubbline',
    imgLink: 'https://vignette.wikia.nocookie.net/shipping/images/5/51/Bubbline_stakes.png/revision/latest?cb=20170312231654',
    tags: ['adventuretime', 'marceline', 'bonnibel']
});

var art3 = new art.Art({
    name: 'Deku',
    imgLink: 'https://i.pinimg.com/originals/a0/0d/cb/a00dcb7631dffe60efc0e2cd7f742eaa.jpg',
    tags: ['boku no hero academia', 'boku no hero', 'deku', 'midorya', 'one for all']
});

var art4 = new art.Art({
    name:'erin',
    imgLink:'http://www.nerdtrip.com.br/wp-content/uploads/2017/09/Shingeki-no-Kyojin-segunda-temporada-2017-2.jpg',
    tags: ['shingeki no kyojin', 'attack on titan', 'erin', 'tita', 'wall']
});


var person = new profile({userName:'miuda06', following: 40, userArts:[art1,art2], userFavoritesArts:[art3, art4]});
var anotherPerson = new this.Profile('onlok', 36);
var otherPerson =  new this.Profile('berkana',45);

person.save(function(err){

	if (err) return console.log(err);
})


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
