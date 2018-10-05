const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('GET/ login', function(){

	it('Test01: responds with json', function(done){
		
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

describe('GET/user', function(){

	it("Test01: should returns a user", function(done){

		request(app)

			.get('/user/miuda06')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(Promise.resolve(res.body)).to.eventually.have.property('profile');
				expect(Promise.resolve(res.body)).to.eventually.have.property('information');
				expect(Promise.resolve(res.body)).to.eventually.have.property('userName').to.equal('miuda06');
				done();
			})
			.catch(done);
	})

	it('Test02: should not find a user with a username that does not exist', () =>{

		request(app)

			.get('/user/bbbb')
			.set('Accept', 'application/json')
			.expect(404);
	})

	it("Test03: should returns the user's information", (done) =>{

		request(app)

			.get('/user/miuda06/info')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{
				
				expect(Promise.resolve(res.body)).to.eventually.have.property('name').to.equal('Thaynnara');
				expect(Promise.resolve(res.body)).to.eventually.have.property('age').to.equal(21);
				expect(Promise.resolve(res.body)).to.eventually.have.property('userName').to.equal('miuda06');
				expect(Promise.resolve(res.body)).to.eventually.have.property('email').to.equal('tatamiuda06@gmail.com');
				expect(Promise.resolve(res.body)).to.eventually.have.property('password').to.equal('bubabua');
				expect(Promise.resolve(res.body)).to.eventually.have.property('date');
				done();
			})
			.catch(done);
	})
	it("Test04: should returns a user's profile", (done) =>{

		request(app)

			.get('/user/onlok/profile')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				 expect(Promise.resolve(res.body)).to.eventually.have.property("userName").to.equal("onlok");
				 expect(Promise.resolve(res.body)).to.eventually.have.property("following").to.equal(36);
				 expect(Promise.resolve(res.body)).to.eventually.have.property("userArts");
				 expect(Promise.resolve(res.body)).to.eventually.have.property("userFavoritesArts");
				 done();
			})
			.catch(done);
			
	})

	it('Test05: get user/profile/myarts should returns all arts from a user', function(done){

		request(app)

			.get('/user/miuda06/profile/myarts')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.ofSize(2);
				done();
			})
			.catch(done);
	})

	it('Test06: get profile/arts/:name should returns a art from a user', function(done){

		request(app)

			.get('/user/miuda06/profile/myarts/adventureTime')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(1);
				expect(res.body[0]).to.have.property('name').to.equal("adventureTime");
				expect(res.body[0]).to.have.property('imgLink');
				expect(res.body[0]).to.have.property('tags').to.be.an('array').to.be.ofSize(4);
				done();
			})
			.catch(done)
	})

	it('Test07: get profile/arts/:name should not returns a art from a user', function(done){

		request(app)

			.get('/user/profile/myarts/time')
			.set('Accept', 'application/json')
			.expect(404)
			done();
	})
	
	it('Test08: get/profile/favorite should returns all favorite arts from a user', function(done){

		request(app)

			.get('/user/onlok/profile/favorite')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array');
				done();
			})
			.catch(done);
	})

	it('Test09: should returns one favorite art from a user', (done) =>{

		request(app)

			.get('/user/miuda06/profile/favorite/erin')
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

	it('Test10: should returns the users following by one user ', (done) =>{

		request(app)

			.get('/user/profile/following')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array');
				done();
			})
			.catch(done);
	})

	it("Test11: should returns one user's profile that is followed by another user", (done) =>{

		request(app)

			.get('/user/profile/following/onlok')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.have.property('username').to.equal('onlok');
				expect(res.body).to.have.property('following');
				done();
			})
			.catch(done);
	})
}) 

describe('POST /profile operations', () =>{

	it('Test01: should add a new art', (done) =>{

		request(app)

			.post('/user/profile/myarts')
			.expect(200) 
			done();
	})

	it('Test02: should add a new favorite art', (done) =>{

		request(app)

			.post('/user/profile/favorite')
			.expect(200)
			done();
	}) 
})