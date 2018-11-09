var mongoose = require('mongoose');

const imageSchema = mongoose.Schema({

	type: String,
	data: Buffer
})

var create = (data, type) =>{

    var newImg = new Image({
        type: type,
        data: data
    })
    return newImg;
}

const Image = mongoose.model('Image', imageSchema);

module.exports = {imageSchema, Image, create};