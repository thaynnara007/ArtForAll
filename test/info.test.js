const info = require('../src/info/InfoModel');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

var info1 = new info.Info({
    firstName: 'Thaynnara', 
    lastName: "Gonçalves", 
    userName: 'miuda06', 
    email: 'tatamiuda06@gmail.com', 
    password: 'bubabua',
    description : "I am an brazilian artist in my free time",
    contact : "083987900836",
})

var info2 = new info.Info({
    name:'Gabriel', 
    age: 21, 
    userName: 'onlok', 
    email: 'gabirel@gmail.com', 
    password: 'miaumiau',
    description : "...Hi, i am pretty shy",
    contact : "083987900835",
});

describe('Testing infoSchema operations', function(){

    it("TEST01: should edits a user's username", function(){

        info1.editUserName('miuda21');
        expect(info1.userName).to.equal('miuda21');

        info2.editUserName('     Onlok');
        expect(info2.userName).to.equal('Onlok');
    })

    it("TEST02: should not edits a user's username", function(){

        expect(info1.editUserName('miuda21')).to.be.false;

        expect(info2.editUserName('     Onlok')).to.be.false;
    })

    it("TEST03: should edits a user's email", function(){

        info1.editEmail('tata.miuda21@gmail.com');
        expect(info1.email).to.equal('tata.miuda21@gmail.com');

        info2.editEmail('Onlok.gabiel.32@hotmail.com');
        expect(info2.email).to.equal('Onlok.gabiel.32@hotmail.com');

        info1.editEmail('tainara.raiane@ccc.ufcg.edu.br');
        expect(info1.email).to.equal('tainara.raiane@ccc.ufcg.edu.br');

        info1.editEmail('    thaynnara.raiany@ccc.ufcg.edu.br'      );
        expect(info1.email).to.equal('thaynnara.raiany@ccc.ufcg.edu.br');
    })

    it("TEST04: should not edit a user's email", function(){

        expect(info1.editEmail('thaynnara.raiany@ccc.ufcg.edu.br')).to.be.false;

        expect(info1.editEmail('thaynnara raiany@ccc.ufcg.edu.br')).to.be.false;

        expect(info2.editEmail('gbriel.onlok@34gmail.com')).to.be.false;

        expect(info1.editEmail('thaynnara raiany@ccc.ufcg.edu.br.')).to.be.false;

        expect(info1.editEmail('thaynnara.raiany@ccc..ufcg.edu.br')).to.be.false;
    })

    it("TEST05: should edits a user' password", function(){

        info1.editPassword("euzinha");
        expect(info1.password).to.equal('euzinha');

        info2.editPassword("lolzinho");
        expect(info2.password).to.equal('lolzinho');

        info1.editPassword("   marceline");
        expect(info1.password).to.equal('marceline');

        info2.editPassword("   jakeTheDog   ");
        expect(info2.password).to.equal('jakeTheDog');
    })

    it("TEST06: should not edits a user's password", function(){

        expect(info1.editPassword('marceline')).to.be.false;

        expect(info2.editPassword('jakeTheDog')).to.be.false;
    });

    it("TEST07: should creates a new info", function(){

       var newInfo = info.create('John', 'Wick', 'john wick', 'john.wick@hotmaol.com','myDogsName');

       expect(newInfo).to.have.property('firstName').to.equals('John');
       expect(newInfo).to.have.property('lastName').to.equals('Wick');
       expect(newInfo).to.have.property('userName').to.equals('john wick');
       expect(newInfo).to.have.property('email').to.equals('john.wick@hotmaol.com');
       expect(newInfo).to.have.property('password').to.equals('myDogsName');
    })
})