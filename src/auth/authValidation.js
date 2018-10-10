const jwt = require('jsonwebtoken');
const authS = require('./authSecret.json');
const authorizationRequired = require('../util/Constants').Authorization_Required;

function validate(req, res, nex){

    const authHeader = req.headers.authorization;

    if(authHeader){
        return res.status(authorizationRequired).send({erro: 'No token provider'});
    }

    var sections = authHeader.split(' ');
    if(sections.length != 2){
        return res.status(authorizationRequired).send({erro: "Token error"});
    }

    jwt.verify(token, authS.secret, (err, decoded) =>{

        if(err){
            return res.status(authorizationRequired).send({erro: 'Token invalid'});
        }
        return next();
    })

     return null;
}