const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var abstractSchema = new Schema({
    
    profileName: {

        type: String,
        required: true,
    },
    userP_id: {

        type: Schema.Types.ObjectId,
        required: true,
    }
})

var Abstract =  mongoose.model('Abstract', abstractSchema);

module.exports = {Abstract, abstractSchema};