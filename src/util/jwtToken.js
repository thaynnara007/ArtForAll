const jwt = require('jwt');
const authS = require('../auth/authSecret.json');

function generateToken(params = {}){

    return jwt.sign(params, authS.secret, {expiresIn: 80000});
}

module.exports.generateToken = generateToken;