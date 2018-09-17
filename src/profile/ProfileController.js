const profile = require('./Profile');

exports.getFollowing = function(req, res){

    names = ["clara", "gabriel", "igor", "sophia"];
	res.json(names);
}

exports.getFollowingUser = function(req, res){

    var name = req.params.name;
    var userProfile = profile.getOneProfile(name);
    
    if(userProfile){

        res.json(userProfile[0]);
    }
    else{

        res.status(400).json('You are not following this user');
    }
}

exports.postFollowing = function(req, res){

    var require = req.body;
	res.send(JSON.stringify(require, null, 2));
}