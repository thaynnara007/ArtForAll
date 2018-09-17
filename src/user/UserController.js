const user = require('./User');

exports.getUserProfile = function(req, res){

    var userName = req.params.name;
    var userProfile = user.getUserProfile(userName);
    
    if(userProfile){

        res.json(userName);
    }else{

        res.status(400);
    }
}