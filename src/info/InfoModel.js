const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var infoSchema = new Schema({

    name: {
        type:String,
        unique: true,
        required: true  
    },
    age: {
        type: Number,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

infoSchema.methods.editUserName = function(newName){

    var name = newName.trim();
    
    if(this.userName === name){

        this.name = name;
    }
}

infoSchema.methods.editEmail = function(newEmail){

    var exp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/

    if( newEmail != this.email && exp.test(newEmail)){

        this.email = newEmail;
    }
}

infoSchema.methods.editPassword = function(newPassword){

    var password = newPassword.trim();

    if(this.password != password){

        this.password = password;
    }
}