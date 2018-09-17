const user = require('./User');

exports.getUserProfile = function(req, res){

    var userName = req.params.name;
    var userProfile = user.getUserProfile(userName);
    
    if(userProfile){

        res.json(userProfile);
    }else{

        res.status(400).json('there is not a user with this username');
    }
}