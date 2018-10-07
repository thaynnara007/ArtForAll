const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');
const userAbstract = require('../user/UserAbstract');

var profileSchema = new Schema();

profileSchema.add({

	_id: Schema.Types.ObjectId,
	userName:{
		type: String,
		required: true,
//		unique:true
	},
	following:[userAbstract.abstractSchema],
	followingNumber:{
		type:Number
	},
	followers:[userAbstract.abstractSchema],
	followersNumber:{
		type:Number
	},
	userArts:[art.artSchema],
	userFavoritesArts:[art.artSchema]
})

profileSchema.methods.incrementFollowers = function(){
	this.followersNumber = this.followersNumber + 1;
}

profileSchema.methods.decrementFollowers = function(){
	this.followersNumber = this.followersNumber - 1;
}

profileSchema.method.incrementFollowing = function(){
	this.followingNumber = this.followingNumber + 1;
}

profileSchema.methods.decrementFollowing = function(){
	this.followingNumber = this.followingNumber - 1;
}

profileSchema.methods.addFollowers = function(userName, _id){

	var abstract = new userAbstract.Abstract({

		profileName: userName,
		userP_id: _id
	})

	this.followers.push(abstract);

	this.incrementFollowers();
}

profileSchema.methods.removeFollowers = function(userP_id){

	this.followers.remove({"userP_id" : userP_id}, function(err0, item){

		if (erro) return console.log(erro);

		console.log(item + " removido como sucesso");
	})

	this.decrementFollowers();
}

profileSchema.methods.removeFollowing = function(userProfile){

	userProfile.removeFollowers(this._id);

	this.following.remove({"userP_id": userProfile._id}, function(erro){

		if (erro) return console.log(erro);

		console.log(item + " removido como sucesso");
	})

	this.decrementFollowing();
}

profileSchema.methods.addFolloweing = function(userProfile){

	var abstract = new userAbstract.Abstract({

		profileName: userProfile.userName,
		userP_id: userProfile._id
	})

	this.following.push(abstract);
	userProfile.addFollowers(this.userName, this._id);

	this.incrementFollowing();
}

var Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile, profileSchema}
