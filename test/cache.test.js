const cache = require('../src/cache/Cache.js');
const mocha = require('mocha');
const chai = require('chai');

var expect = chai.expect;

describe('Testing cache operations', () => {

    it('TEST00: should delete all keys from cache', () =>{

        cache.deleteAll();
        expect(cache.len()).to.equal(0);
    })

    it('TEST01: should returns the current number of entries in the cache', () =>{

        expect(cache.len()).to.equal(0);
    })

    it('TEST02: should put a nem key-value in the cache', () =>{
        
        cache.put('foo', 'bar');
        cache.put('r2d2', 'biipbiibop');
        cache.put('houdini', 'dissapear', 100, function(key, value) {
            console.log(key + ' did ' + value);
        });
        
        expect(cache.len()).to.equal(3);
    })

    it('TEST03: Should gets a value, by a key, in the cache', () =>{

        expect(cache.get('foo')).to.equal('bar');
        expect(cache.get('houdini')).to.equal('dissapear');
    })

    it('TEST04: should not takes a key that does not exist in cache', () =>{

        expect(cache.get('key')).to.be.null;
    })

    it('TEST05: should deletes a element from the cache', () =>{

        cache.delete('r2d2');
        expect(cache.len()).to.equal(2);
    })

    it('TEST06: should returns a JSON', () =>{

        var json = cache.getJSON();
        console.log(json);
       
       // json.should.have.property("foo");
   })

   it('TEST07: should deletes all elements from cache', () =>{

        cache.deleteAll();
        expect(cache.len()).to.equal(0);
   })
})