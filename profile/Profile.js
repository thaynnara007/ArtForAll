/**
Represents a Information
@constructor
@param {string} name - The name of the user
@param {int} age - The user's age
*/
var Info = function(name, age){

	this.name = name;
	this.age = age;
}

var info1 = new Info("Thaynnara", 21);
var info2 = new Info("Gabriel", 21);
var info3 = new Info("Clara", 22);

//---------------PROFILE-------------------------//

/**
Represents a Profile
@constructor
@param {Object} info- The information about that user
@param {string} username - username
@param {int}  fllowing - number of people taht user is following
@param {int} id - The id of the profile
*/
var Profile = function(info, userName, following, id){

	this.info = info;
	this.username = userName;
	this.following = following;
	this.id = id;
}

var person = new Profile(info1, 'miuda06', 40, 1);
var anotherPerson = new Profile(info2, 'onlok', 36, 2);
var otherPerson =  new Profile(info3, 'berkana',45, 3);


this.profiles = () => [person, anotherPerson, otherPerson]

/**
Returns a profile that has a specific username
@param {string} userName - username
@returns {Object}
*/
this.getOneProfile = function(userName){

	var profile = this.profiles().filter(function(profile){

		return profile.username == userName;
	})

	return profile;
}
