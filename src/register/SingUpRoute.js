const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const service = require('./SingUpService');

router.use(bodyParser.json());

router.post('/', service.singUp);

module.exports = router;