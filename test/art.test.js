const Art = require('../src/art/Art');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

var art1 = new Art({
    name: 'adventureTime',
    imgLink: 'https://cdn.shopify.com/s/files/1/0558/2081/products/ATCAWM_FC_1024x1024.jpg?v=1534804643',
    tags: ['adventuretime', 'fanart', 'finn', 'jake']
});

var art2 = new Art({
    name: 'Bubbline',
    imgLink: 'https://vignette.wikia.nocookie.net/shipping/images/5/51/Bubbline_stakes.png/revision/latest?cb=20170312231654',
    tags: ['adventuretime', 'marceline', 'bonnibel']
});

var art3 = new Art({
    name: 'Deku',
    imgLink: 'https://i.pinimg.com/originals/a0/0d/cb/a00dcb7631dffe60efc0e2cd7f742eaa.jpg',
    tags: ['boku no hero academia', 'boku no hero', 'deku', 'midorya', 'one for all']
});

describe('Testing Art schema operations', () =>{

    it("Test: should edits a art's name", () =>{

        art1.editName('Hora de Aventura');
        expect(art1.name).to.equal('Hora de Aventura');

        art1.editName(art2.name);
        expect(art1.name).to.equal(art2.name);

        art1.editName('Adventure Time');
        expect(art1.name).to.equal('Adventure Time');
    })

    it("Test: should not edits a art's name", () =>{

        art3.editName('');
        expect(art3.name).to.equal('Deku');

        art3.editName('       ');
        expect(art3.name).to.equal('Deku');

        art3.editName('   Midorya    ');
        expect(art3.name).to.equal('Deku');
    })

    it('Test: should puts a new tag in a art', () =>{

        expect(art2.tags.length).to.equal(3);
        art2.addTag('Marcy');

        expect(art2.tags.length).to.equal(4);
        expect(art2.tags[3]).to.equal('Marcy');

        art2.addTag('    Bubblegum  ')
        expect(art2.tags.length).to.equal(5);
        expect(art2.tags[4]).to.equal('Bubblegum');
    })

    it("Test: should removes a art's tag", () =>{

        expect(art2.tags.length).to.equal(5);

        art2.removeTag('Marcy');
        expect(art2.tags.length).to.equal(4);
        
        art2.removeTag('   Bubblegum');
        expect(art2.tags.length).to.equal(3);
    })
})
