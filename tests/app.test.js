const app = require('../app/index.js');
const request = require('supertest');

request(app)
	
	.get('/signup')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function(err, res){

		if (err) throw err;
	});

request(app)
	
	.get('/signin')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function(err, res){

		if (err) throw err;
	});