const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');
const userAbstract = require('../user/UserAbstract');

var profileSchema = new Schema();

profileSchema.add({

	_id: Schema.Types.ObjectId,
	userName:{
		type: String,
		required: true
	},
	following:[userAbstract.abstractSchema],
	followingNumber:{
		type:Number,
		default: 0
	},
	followers:[userAbstract.abstractSchema],
	followersNumber:{
		type:Number,
		default: 0
	},
	userArts:[art.artSchema],
	userFavoritesArts:[art.artSchema]
})

var create = function(id, userName,following, followingNumber, followers, followersNumber, userArts, userFavoritesArts){

	var newProfile = new Profile({

		_id: id,
		userName: userName,
		following: following,
		followingNumber: followingNumber,
		followers: followers,
		followersNumber: followersNumber,
		userArts: userArts,
		userFavoritesArts: userFavoritesArts
	})

	return newProfile
}

profileSchema.methods.incrementFollowers = function(){
	this.followersNumber = this.followersNumber + 1;
}

profileSchema.methods.decrementFollowers = function(){
	if(this.followersNumber > 0) this.followersNumber = this.followersNumber - 1;
}

profileSchema.methods.incrementFollowing = function(){
	this.followingNumber = this.followingNumber + 1;
}

profileSchema.methods.decrementFollowing = function(){
	if(this.followingNumber > 0) this.followingNumber = this.followingNumber - 1;
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

	var newFollowers = [];
	var found = false;
	
	this.followers.forEach(abstract => {
		
		if (abstract.userP_id !=userP_id ){
			newFollowers.push(abstract);
		}
		else found = true;

		if(found){ 

			console.log("removido.")
			this.followers = newFollowers;
		}
	})

	this.decrementFollowers();
}

profileSchema.methods.removeFollowing = function(userProfile){

	userProfile.removeFollowers(this._id);
	var newFollowings = [];
	var found = false;

	this.following.forEach(abstract => {
		
		if (abstract.userP_id != userProfile._id){
			newFollowings.push(abstract);
		}
		else found = true;

		if(found){ 

			console.log("removido.")
			this.following = newFollowings;
		}
	})

	this.decrementFollowing();
}

profileSchema.methods.addFollowing = function(userProfile){

	var abstract = new userAbstract.Abstract({

		profileName: userProfile.userName,
		userP_id: userProfile._id
	})

	this.following.push(abstract);
	userProfile.addFollowers(this.userName, this._id);

	this.incrementFollowing();
}

profileSchema.methods.addArt = function(newArt){
	this.userArts.push(newArt);
}

profileSchema.methods.removeArt = function(artId){

	var arts = this.userArts.filter(function(art){
		return art._id != artId;
	})

	this.userArts = arts;
}

profileSchema.methods.getOneArt = function(artId){

	var art = this.userArts.filter((art) =>{
		return art._id == artId;
	})
	
	return  art[0];
}

profileSchema.methods.addFavoriteArt = function(art){
	this.userFavoritesArts.push(art);
}

profileSchema.methods.removeFavoriteArt = function(artId){

	var arts = this.userFavoritesArts.filter((art) =>{
		return art._id != artId;
	})
	
	this.userFavoritesArts = arts;
}

var Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile, profileSchema, create}
