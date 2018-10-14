const jwt = require('jsonwebtoken');
const authS = require('./authSecret.json');
const AuthorizationRequired = require('../util/Constants').Authorization_Required;

function validate(req, res, nex){

    const authHeader = req.headers.authorization;
    console.log(req.headers);

    if(!authHeader){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return res.status(AuthorizationRequired).send({error: 'No token provider'});
    }

    var sections = authHeader.split(' ');
    if(sections.length != 2){
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        return res.status(AuthorizationRequired).send({error: 'Token error'});
    }

    const [scheme, token] = sections;
    if(!/^Bearer$/i.test(scheme)){
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        return res.status(AuthorizationRequired).send({error: 'Token malformatted'});
    }

    jwt.verify(token, authS.secret, (err, decoded) =>{

        if(err) return res.status(AuthorizationRequired).send({error: 'Token invalid'});

        req.userId = decoded.id;

        return next();
    })

    return null;
}

module.exports = validate;