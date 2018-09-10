const app = require('../app/index.js');
const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');


describe('GET/ signup', function(){

	it('responds with json', function(done){
		
		request(app)
		
			.get('/signup')
			//.expect('Content-Type', /json/)
			.set('Accept', 'appliaction/json')
			.expect(200)
			.end(function(err, res){

				if (err) return done(err);
				done();
			});
	});	
});

request(app)
	
	.get('/signin')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function(err, res){

		if (err) throw err;
	});