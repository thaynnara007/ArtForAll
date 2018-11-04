const app = require('../src/index.js');
const util = require('../src/util/user');
const Art = require('../src/art/ArtModel');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('-------------------|GET /favorite|----------------------------', function(){

	it('TEST01: get/profile/favorite should returns all favorite arts from a user', function(done){

		request(app)

			.get('/user/me/profile/favorite')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(2);
				done();
			})
			.catch(done);
	})

	it('TEST02: get/profile/favorite should returns all favorite arts from the logged user', function(done){

		request(app)

			.get('/user/me/profile/favorite')
			.set('Accept', 'application/json')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array');
				done();
			})
			.catch(done);
	})

	it('TEST03: should returns one favorite art from a user', (done) =>{

		request(app)

			.get('/user/Berkana/profile/favorite/Bubbline')
			.set('Accept', 'application/json/')
			.expect(200)
			.then((res) =>{

				expect(res.body).to.be.an('array').to.be.ofSize(1);
				expect(res.body[0]).to.have.property('name').to.equal('Bubbline');
				expect(res.body[0]).to.have.property('imgLink');
				expect(res.body[0]).to.have.property('tags').to.be.an('array').to.be.ofSize(3);
				done();
			})
			.catch(done);
	}) 

	it('TEST04: should returns one favorite art from the logged user', (done) =>{

		request(app)

			.get('/user/me/profile/favorite/Deku')
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
})

describe('-------------------|POST /favorite|----------------------------', function(){

    it("TEST01: it should adds a new art in to he logged user favorites arts", (done) =>{

        let date ={

            art: Art.create('ciro uzumaki', 'www.sjsbdsa.sdjlaladas', ['ciro','cirao da massa', 'ciro uzumaki vs bolsonario uchiha'], util.generateId('5bddd2d2e2b1051e74fb7308'))
        }
        request(app)

            .post('/user/me/profile/favorite')
            .send(date)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
			.expect(200)
			.expect('"Added successful"')
			.end((err) =>{
				if(err) return done(err);
				done();
			})
	})
})  

describe('----------------------------|DELETE /favorite|------------------------------', () =>{
	

	it('TEST01: it should deletes a art from the userFavoritesArts', (done) =>{
		
		setTimeout(done, 15000);
		let date = {

			artId: util.generateId('5bddd2d2e2b1051e74fb7308')
		}

		request(app)

			.delete('/user/me/profile/favorite')
			.send(date)
			.expect(204)
			.end((err) =>{
				if(err) return done(err);
				done();
			})
    })
}) 