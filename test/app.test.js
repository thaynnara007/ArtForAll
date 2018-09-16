const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');

describe('GET/ signup', function(){

	it('responds with json', function(done){
		
		request(app)
		
			.get('/signup')
			.set('Accept', 'appliaction/json')
			.expect(200)
			.end(function(err, res){

				if (err) return done(err);
				done();
			});
	});	
});

describe('GET/ login', function(){

	it('responds with json', function(done){
		
		request(app)
		
			.get('/login')
			.set('Accept', 'application/json/')
			.expect(200)
			.end(function(err, res){

				if (err) return done(err);
				done();
			});
	})
});

describe('GET/profile', function(){

	it('get profile should responds with json', function(done){

		request(app)

			.get('/profile/miuda06')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){

				if(err) return done(err);
				done();
			})
	})

	it('get profile/arts should responds with json', function(done){

		request(app)

			.get('/profile/arts')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){
				
				if(err) return done(err);
				done();
			})
	})

	it('get profile/arts/:id should responds with json', function(done){

		request(app)

			.get('/profile/arts/0')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){
				
				if(err) return done(err);
				done();
			})
	})

	it('get/profile/arts/favorite should response with json', function(done){

		request(app)

			.get('/profile/favorite')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){

				if(err) return done(err);
				done();
			})
	})
}) 