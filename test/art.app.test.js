const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('-------------------|GET /myarts|----------------------------', function(){

    it('TEST01: get user/profile/myarts should returns all arts from a user', function(done){

		request(app)

			.get('/user/onlok/profile/myarts')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.ofSize(1);
				done();
			})
			.catch(done);
	})

	it('TEST02: get user/profile/myarts should returns all arts from the logged user', function(done){

		request(app)

			.get('/user/me/profile/myarts')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.ofSize(2);
				done();
			})
			.catch(done);
	})

	it('TEST03: get profile/arts/:name should returns a art from a user', function(done){

		request(app)

			.get('/user/Berkana/profile/myarts/erin')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(1);
				expect(res.body[0]).to.have.property('name').to.equal("erin");
				expect(res.body[0]).to.have.property('imgLink');
				expect(res.body[0]).to.have.property('tags').to.be.an('array').to.be.ofSize(5);
				done();
			})
			.catch(done)
	})

	it('TEST04: get profile/arts/:name should returns a art from the logged user', function(done){

		request(app)

			.get('/user/me/profile/myarts/adventureTime')
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

	it('TEST05: get profile/arts/:name should not returns a art from a user', function(done){

		request(app)

			.get('/user/onlok/profile/myarts/time')
			.set('Accept', 'application/json')
			.expect(404)
			done();
	})
})

describe('-------------------|POST /myarts|----------------------------', function(){

    it("TEST01: it should create a new art in the logged user's arts", (done) =>{

        let date = {

            'name': "jojos",
            'imgLink': 'https://i2.wp.com/jerimumgeek.oportaln10.com.br/wp-content/uploads/2017/03/nw4zOlM.jpg?resize=649%2C400&ssl=1',
            'tags': ['Jojos bizarre adventure', 'seasson4', 'jojos']
        }

        request(app)

            .post('/user/me/profile/myarts')
            .send(date)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
			.expect(201)
			.expect('"New art created"')
			.end((err) =>{
				if(err) return done(err);
				done();
			})
    })
}) 