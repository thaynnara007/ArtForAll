const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('----------------------|GET /user|----------------------------', function(){

	it("TEST01: should returns a user", function(done){

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

	it('TEST02: should not find a user with a username that does not exist', () =>{

		request(app)

			.get('/user/bbbb')
			.set('Accept', 'application/json')
			.expect(404);
	})

	it("TEST03: should returns the user's information", (done) =>{

		request(app)

			.get('/user/me/info')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{
				
				expect(Promise.resolve(res.body)).to.eventually.have.property('firstName').to.equal('Thaynnara');
				expect(Promise.resolve(res.body)).to.eventually.have.property('lastName').to.equal('Gonçalves');
				expect(Promise.resolve(res.body)).to.eventually.have.property('userName').to.equal('miuda06');
				expect(Promise.resolve(res.body)).to.eventually.have.property('email').to.equal('tatamiuda06@gmail.com');
				expect(Promise.resolve(res.body)).to.eventually.have.property('password').to.equal('bubabua');
				expect(Promise.resolve(res.body)).to.eventually.have.property('description').to.equal("I am an brazilian artist in my free time");
				expect(Promise.resolve(res.body)).to.eventually.have.property('contact').to.equal("083987900836");
				expect(Promise.resolve(res.body)).to.eventually.have.property('date');
				done();
			})
			.catch(done);
	})
	it("TEST04: should returns 401 Unauthorized", (done) =>{

		request(app)

			.get('/user/miuda06/info')
			.set('Accept', 'application/json')
			.expect(401)
			.expect("'You do not have permission for it'")
			done();
    })
})

describe('----------------------|POST /user|-------------------------', () =>{

	it("TEST01: it should respond with 201 created", (done) =>{

		let newUser = {

			'firstName': 'Jack',
			'lastName': 'Frost',
			'userName': 'JackFromTest',
			'email': 'jackFromTest@ccc.ufch.edu.br',
			'password': 'jackFrost'
		}

		request(app)

			.post('/user')
			.send(newUser)
			.set('Acceptd', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.expect('"User registered"')
			.end((err) =>{
				if(err) return done(err);
				done();
			})
	})

	it("TEST02: it should respond with 400 bad request", (done) =>{

		let newUser = {

			'firstName': 'Jack',
			'lastName': 'Frost',
			'email' : 'jackFromTest@ccc.ufch.edu.br',
			'userName': 'JackFrommTest',
			'password': 'jackFrostt'
		}

		request(app)

			.post('/user')
			.send(newUser)
			.set('Acceptd', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.expect('"User not created"')
			.end((err) =>{
				if(err) return done(err);
				done();
			}) 
    })

})

describe("-----------------------------|DELETE /user|------------------------", () =>{

	it("TEST03: it should deletes one user", function(done){

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