const app = require('../src/index.js');
const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised")
const mocha = require('mocha');
const assertArrays = require('chai-arrays');
const expect = chai.expect;

chai.use(chaiAsPromised)
chai.use(assertArrays);

describe('--------------------|GET /profile|-----------------------', () =>{

it("TEST05: should returns a user's profile", (done) =>{

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

it("TEST06: should return the logged user profile", (done) =>{

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

it('TEST07: should returns the users following by one user ', (done) =>{

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

it("TEST08: should returns one user's profile that is followed by another user", (done) =>{

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

it('TEST09: should returns the users following by the logged user ', (done) =>{

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

it("TEST10: should returns one user's profile that is followed by the logged user", (done) =>{

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

describe('----------------------------|POST /profile|-------------------------', () =>{

	it('TEST01: should add a new art', (done) =>{

		request(app)

			.post('/user/profile/myarts')
			.expect(200) 
			done();
	})

	it('TEST02: should add a new favorite art', (done) =>{

		request(app)

			.post('/user/profile/favorite')
			.expect(200)
			done();
	}) 

	it('TEST03: should add a new user at another user following list', (done) =>{

		request(app)

			.post('/user/onlok/profile/following')
			.expect(200)
			done();
    }) 
})