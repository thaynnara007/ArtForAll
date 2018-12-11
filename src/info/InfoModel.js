const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var infoSchema = new Schema({

    firstName: {
        type:String,
        required: true  
    },
    lastName: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'your email is needed please put one'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    description: {type:String},
	contact: {type:String},
    date: {
        type: Date,
        default: Date.now

    }
})

var create = function(firstName, lastName, userName, email, password, description, contact){

    var newInfo = new Info({

        firtsName: firstName,
		lastName: lastName,
		description: description,
		contact: contact,
        userName: userName,
        email: email,
        password: password,
    })

    return newInfo;
}

infoSchema.methods.editUserName = function(newName){
  
    var name = newName.trim();

    if(this.userName != name){

        this.userName = name;
        return true;
    }

    return false;
}

infoSchema.methods.editEmail = function(newEmail){

    var newEmail = newEmail.trim();
    var exp = /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+(\.[a-z]+)*$/

    if( newEmail != this.email && exp.test(newEmail)){

        this.email = newEmail;
        return true;
    }

    return false;
}

infoSchema.methods.editPassword = function(newPassword){

    var password = newPassword.trim();

    if(this.password != password){

        this.password = password;
        return true;
    }
    return false;
}

var Info = mongoose.model('Info', infoSchema);

module.exports = {Info, infoSchema, create};