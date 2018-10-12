var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var service = require('./AuthService');

router.use(bodyParser.json());

router.post('/', service.login);