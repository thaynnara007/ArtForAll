const profile = require('../profile/Profile');

/**
Represents a Information
@constructor
@param {string} name - The name of the user
@param {int} age - The user's age
@param {String} username - username
*/

var Info = function(name, age, username, email, password, date){

	this.name = name;
    this.age = age;
    this.username = username;
    this.email = email;
    this.password = password;
    this.date = date;
}

var User = function(info){

    this.info = info;
    this.profile = new profile.Profile(info.username, 0, 0)
}

var info1 = new Info('Thaynnara', 21, 'miuda06', 'tatamiuda06@gmail.com', 'bubabua', new Date());
var info2 = new Info('Gabriel', 21, 'onlok', 'gabirel@gmail.com', 'miaumiau', new Date());

var user1 = new User(info1);
var user2 = new User(info2);

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