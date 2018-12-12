const Constants = require('../util/Constants')
const NOT_FOUND = Constants.NOT_FOUND_STATUS;
const User = require('../user/UserModel');
const jwtToken = require('../util/jwtToken');

exports.login =  function(req, res){

    var userName = req.body.userName;
    var password = req.body.password;

    User.User.findOne({'information.userName': userName, 'information.password': password}, function(err, user){

        if(err) return console.log(err);

        else if(!user) res.status(NOT_FOUND).json("email or password invalid");

        else {

            res.status(200).send({
            userName: user.userName,
            token: jwtToken.generateToken({id: user.id})
        })
    }
    })

}
