var Info = function(name, old){

	this.name = name;
	this.old = old;
}

var info1 = new Info("Thaynnara", 21);
var info2 = new Info("Gabriel", 21);
var info3 = new Info("Clara", 22);

//---------------PROFILE-------------------------//
var Profile = function(info, following, id){

	this.info = info;
	this.following = following;
	this.id = id;
}

var person = new Profile(info1, 40, 1);
var anotherPerson = new Profile(info2, 36, 2);
var otherPerson =  new Profile(info3, 45, 3);

const profile = {

profiles: [person, anotherPerson, otherPerson]
}

module.exports = profile;
