const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('/ login', function(){

	let data = {

		'email': 'tatamiuda06@gmail.com',
		'password': 'bubabua'
	}

	it('Test01: it should made login in the system', function(done){
		
		request(app)
		
			.post('/login')
			.send(data)
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

			.get('/user/me/info')
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
	it("Test04: should return 401 Unauthorized", (done) =>{

		request(app)

			.get('/user/miuda06/info')
			.set('Accept', 'application/json')
			.expect(401)
			.expect("'You do not have permission for it'")
			done();
	})

	it("Test05: should returns a user's profile", (done) =>{

		request(app)

			.get('/user/onlok/profile')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				 expect(Promise.resolve(res.body)).to.eventually.have.property("userName").to.equal("onlok");
				 expect(Promise.resolve(res.body)).to.eventually.have.property("following").to.be.an('array');
				 expect(Promise.resolve(res.body)).to.eventually.have.property("userArts");
				 expect(Promise.resolve(res.body)).to.eventually.have.property("userFavoritesArts");
				 expect(Promise.resolve(res.body)).to.eventually.have.property('followers').to.be.an('array');
				 done();
			})
			.catch(done);	
	})

	it("Test06: should return the logged user profile", (done) =>{

		request(app)

			.get('/user/me/profile')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(Promise.resolve(res.body)).to.eventually.have.property("userName").to.equal("miuda06");
				expect(Promise.resolve(res.body)).to.eventually.have.property("following").to.be.an('array');
				expect(Promise.resolve(res.body)).to.eventually.have.property("userArts");
				expect(Promise.resolve(res.body)).to.eventually.have.property("userFavoritesArts");
				expect(Promise.resolve(res.body)).to.eventually.have.property('followers').to.be.an('array');
				done();
			})
			.catch(done)
	})

	it('Test07: get user/profile/myarts should returns all arts from a user', function(done){

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

	it('Test08: get profile/arts/:name should returns a art from a user', function(done){

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

	it('Test09: get profile/arts/:name should not returns a art from a user', function(done){

		request(app)

			.get('/user/onlok/profile/myarts/time')
			.set('Accept', 'application/json')
			.expect(404)
			done();
	})
	
	it('Test010: get/profile/favorite should returns all favorite arts from a user', function(done){

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

			.get('/user/miuda06/profile/favorite/Deku')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(1);
				expect(res.body[0]).to.have.property('name').to.equal('Deku');
				expect(res.body[0]).to.have.property('imgLink');
				expect(res.body[0]).to.have.property('tags').to.be.an('array').to.be.ofSize(5);
				done();
			})
			.catch(done);
	}) 

	it('Test10: should returns the users following by one user ', (done) =>{

		request(app)

			.get('/user/onlok/profile/following')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(2);
				expect(res.body[0]).to.equals('Berkana');
				expect(res.body[1]).to.equals('miuda06');
				done();
			})
			.catch(done);
	})

	it("Test11: should returns one user's profile that is followed by another user", (done) =>{

		request(app)

			.get('/user/onlok/profile/following/miuda06')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(Promise.resolve(res.body)).to.eventually.have.property('profileName');
				expect(Promise.resolve(res.body)).to.eventually.have.property('userP_id');
				done();
			})
			.catch(done);
	})

	it('Test12: should returns the users following by one user ', (done) =>{

		request(app)

			.get('/user/me/profile/following')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(2);
				expect(res.body[0]).to.equals('onlok');
				expect(res.body[1]).to.equals('Berkana');
				done();
			})
			.catch(done);
	})

	it("Test13: should returns one user's profile that is followed by another user", (done) =>{

		request(app)

			.get('/user/me/profile/following/onlok')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(Promise.resolve(res.body)).to.eventually.have.property('profileName');
				expect(Promise.resolve(res.body)).to.eventually.have.property('userP_id');
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

	it('Test02: should add a new user at another user following list', (done) =>{

		request(app)

			.post('/user/onlok/profile/following')
			.expect(200)
			done();
	}) 
})
describe('Testing POST /singup operations', () =>{

	it("Test01: it should respond with 201 created", (done) =>{

		let data = {

			'name': 'Jack',
			'age': 17,
			'userName': 'JackFromTest',
			'email': 'jackFromTest@ccc.ufch.edu.br',
			'password': 'jackFrost'
		}

		request(app)

			.post('/singup')
			.send(data)
			.set('Acceptd', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.expect('"User registered"')
			.end((err) =>{
				if(err) return done(err);
				done();
			})
	})

	it("Test02: it should respond with 400 bad request", (done) =>{

		let data = {

			'name': 'Jack',
			'age': 17,
			'userName': 'JackFrommTest',
			'password': 'jackFrostt'
		}

		request(app)

			.post('/singup')
			.send(data)
			.set('Acceptd', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.expect('"User not created"')
			.end((err) =>{
				if(err) return done(err);
				done();
			})
	})

	it("Test03: it should deletes one user", function(done){

		let data = {

			email: 'jackFromTest@ccc.ufch.edu.br',
			password: 'jackFrost'
		}

		request(app)

			.delete('/user')
			.send(data)
			.set('Acceptd', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect('"User was deleted"')
			.end((err) =>{

				if(err) return done(err)
				done();
			})	
	}) 

})