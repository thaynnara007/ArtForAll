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

	it('TEST01: it should made login in the system', function(done){
		
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
