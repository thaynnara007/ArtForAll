const mongoose = require('mongoose');
const image = require('../image/imageModel'); 

var artSchema = new mongoose.Schema({

	name: {
		type:String, 
		required: [true, 'the name will helps other users to find your art, so choose a name for it']
	},
	author:{
		type:String,
		default:""
	},
	collectioon: {
		type:String,
		default: ''
	},
	description: {
		type:String,
		default:''
	},
	contact:{
		type:String,
		default: ''
	},
	tags: {
		type: [{ type: String }], 
		required: [true, 'tags will helps others users to find your art, so choose some tags']
	},
	date: {
		type: Date, 
		default: Date.now}
});

var create = function(name, author, tags, collectioon, description, contact, id){

	var newArt = new Art({

		name: name,
		author: author,
		collectioon: collectioon,
		description: description,
		tags: tags,
		contact: contact,
		_id: id
	})
	return newArt;
}

artSchema.methods.editName = function(newName){

	var exp = /^\w.*\w$/;

	if(exp.test(newName)){
		this.name = newName
	}
}

artSchema.methods.addTag = function(newTag){

	newTag = newTag.trim()

	var index = this.tags.indexOf(newTag);

	if(index > -1){

		return false;
	}else{

		this.tags.push(newTag);

		return true;
	}
}

artSchema.methods.removeTag = function(tag){

	tag = tag.trim();

	var index = this.tags.indexOf(tag);

	if(index > -1){

		this.tags.splice(index,1);

		return true;
	}else{

		return false;
	}
}

var Art = mongoose.model('Art', artSchema);

module.exports = {Art, artSchema, create};

