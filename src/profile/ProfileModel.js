const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');
const userAbstract = require('../user/UserAbstract');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

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

profileSchema.methods.addFollowers = function(userName, _id){

	var abstract = new userAbstract.Abstract({

		profileName: userName,
		userP_id: _id
	})

	this.followers.push(abstract);

	this.incrementFollowers();
}


var Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile, profileSchema}
