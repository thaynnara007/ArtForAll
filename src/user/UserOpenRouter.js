const express = require('express');
const bodyParser = require('body-parser');
const service = require('./UserService');
const openRouter = express.Router();

openRouter.use(bodyParser.json());
openRouter.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    next();
})

openRouter.post('/', service.singUp )

module.exports = openRouter;