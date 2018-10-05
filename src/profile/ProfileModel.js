const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const art = require('../art/ArtModel');
mongoose.connect('mongodb://localhost/myBD', { useNewUrlParser: true });


var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', function () {

    console.log('we are connected');
});

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

var Profile = mongoose.model('Profile', profileSchema);
module.exports = {Profile, profileSchema}
