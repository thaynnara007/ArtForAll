const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');

const expect = chai.expect;


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

	it("should returns a user/'s profile", function(done){

		request(app)

			.get('/profile/miuda06')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.have.property('info').to.be.an('object');
				expect(res.body).to.have.property('username').to.equal('miuda06');
				done();
			})
			.catch(done);
	})

	it('get profile/myarts should returns all arts from a user', function(done){

		request(app)

			.get('/profile/myarts')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array');
				done();
			})
			.catch(done);
	})

	it('get profile/arts/:id should returns a art from a user', function(done){

		request(app)

			.get('/profile/myarts/adventureTime')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.have.property('name').to.equal("adventureTime");
				expect(res.body).to.have.property('imgLink');
				expect(res.body).to.have.property('tags').to.be.an('array');
				done();
			})
			.catch(done)
	})

	it('get profile/arts/:id should returns a art from a user', function(done){

		request(app)

			.get('/profile/myarts/3')
			.set('Accept', 'application/json')
			.expect(400)
			done();
	})

	it('get/profile/favorite should returns all favorite arts from a user', function(done){

		request(app)

			.get('/profile/favorite')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array');
				done();
			})
			.catch(done);
	})

	it('Test: should returns one favorite art from a user', (done) =>{

		request(app)

			.get('/profile/favorite/erin')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.have.property('name').to.equal('erin');
				expect(res.body).to.have.property('imgLink');
				expect(res.body).to.have.property('tags').to.be.an('array');
				done();
			})
			.catch(done);
	})
}) 

describe('POST /profile operations', () =>{

	it('Test: should add a new art', (done) =>{

		request(app)

			.post('/profile/arts')
			.expect(200) 
			done();
	})
})