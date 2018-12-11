const profile = require('../src/profile/ProfileModel');
const Art = require('../src/art/ArtModel');
const util = require('../src/util/user');
const image = require('../src/image/imageModel');
const fs = require('fs');
const mocha = require('mocha');
const chai = require('chai');
const assertArrays = require('chai-arrays');
const mongoose = require('mongoose');
const expect = chai.expect;

chai.use(assertArrays);

var profile1 = new profile.Profile({

    _id : "5bb93c6a06f71e1efd75bb4d",
    userName : "miuda06",
    following : [],
    followingNumber : 0,
    followers : [],
    followersNumber : 0,
    userArts: [],
    userFavoritesArts: []
})

var profile2 = new profile.Profile({

    _id : "5bb93cb3edc6e41f1c000db9",
    userName : "onlok",
    following : [],
    followingNumber : 0,
    followers : [],
    followersNumber : 0,
    userArts: [],
    userFavoritesArts: []
})

var profile3 = new profile.Profile({

    _id : "5bb93ced3209b71f390c58a9",
    userName : "Berkana",
    following : [],
    followingNumber : 0,
    followers : [],
    followersNumber : 0,
    userArts: [],
    userFavoritesArts: []
})

var art = Art.create('uzumaki', ['naruto', 'hokage'], util.generateId('5bddaa84da0ba0111f2bf270'));

describe('ProfileModel methods Test', function(){

    it("TEST01: it should increase user's followers in one ", function(){

        expect(profile1.followersNumber).to.equals(0);
        profile1.incrementFollowers();
        expect(profile1.followersNumber).to.equals(1);
    })

    it("TEST02: it should increase the number of users that the user is following in one ", function(){

        expect(profile1.followingNumber).to.equals(0);
        profile1.incrementFollowing();
        expect(profile1.followingNumber).to.equals(1);
    })

    it("TEST03: it should decrease the number of users that the user is following in one ", function(){

        expect(profile1.followingNumber).to.equals(1);
        profile1.decrementFollowing();
        expect(profile1.followingNumber).to.equals(0);
    })

    it("TEST04: it should decrease the number of user's followers in one ", function(){

        expect(profile1.followersNumber).to.equals(1);
        profile1.decrementFollowers();
        expect(profile1.followersNumber).to.equals(0);
    })

    it("TEST05: it should not decrease the number of user's followers in one ", function(){

        expect(profile1.followersNumber).to.equals(0);
        profile1.decrementFollowers();
        expect(profile1.followersNumber).to.equals(0);
    })

    it("TEST06: it should not decrease the number of users that the user is following in one ", function(){

        expect(profile1.followingNumber).to.equals(0);
        profile1.decrementFollowing();
        expect(profile1.followingNumber).to.equals(0);
    })

    it("TEST07: it should adds a follower into a user", function(){

        expect(profile1.followers).to.be.an('array').to.be.ofSize(0);
        profile1.addFollowers(profile2.userName, profile2._id);
        expect(profile1.followers).to.be.an('array').to.be.ofSize(1);
        expect(profile1.followers[0]).to.have.property('profileName').to.equals("onlok");
        expect(profile1.followers[0]).to.have.property('userP_id');
        expect(profile1.followersNumber).to.equals(1);

        profile1.addFollowers(profile3.userName,profile3._id);
        expect(profile1.followers).to.be.an('array').to.be.ofSize(2);
        expect(profile1.followers[1]).to.have.property('profileName').to.equals("Berkana");
        expect(profile1.followers[1]).to.have.property('userP_id');    
        expect(profile1.followersNumber).to.equals(2)
    })

    it("TEST08: it should removes one user's follower", function(){

        profile1.removeFollowers(profile3._id);
        expect(profile1.followers).to.be.ofSize(1);
        expect(profile1.followersNumber).to.equals(1);
    })

    it("TEST09: it should adds user in to the flollowing list from a user", () =>{

        expect(profile3.following).to.be.an('array').to.be.ofSize(0);
        profile3.addFollowing(profile1);
        expect(profile3.following).to.be.ofSize(1);
        expect(profile3.followingNumber).to.equals(1);
        expect(profile3.following[0]).to.have.property("profileName").to.equals("miuda06");
        expect(profile3.following[0]).to.have.property("userP_id");
      
        expect(profile1.followers).to.be.ofSize(2);
        expect(profile1.followersNumber).to.equals(2);
        expect(profile1.followers[1]).to.have.property('profileName').to.equals("Berkana");
        expect(profile1.followers[1]).to.have.property('userP_id'); 
    })

    it("TEST10: it should removes a user from the following list from another user", () =>{

        profile3.removeFollowing(profile1);
        expect(profile3.following).to.be.ofSize(0);
        expect(profile3.followingNumber).to.equals(0);

        expect(profile1.followers).to.be.ofSize(1);
        expect(profile1.followersNumber).to.equals(1);
    })

    it('TEST11: it should creates a new profile', () =>{

        var newProfile = profile.create( new mongoose.Types.ObjectId(),"ReginaGeorge", [], 8765,[], 4000,[], []);

        expect(newProfile).to.have.property('_id');
        expect(newProfile).to.have.property('userName').to.equals('ReginaGeorge');
        expect(newProfile).to.have.property('following').to.be.an('array').to.be.ofSize(0);
        expect(newProfile).to.have.property('followingNumber').to.equals(8765);
        expect(newProfile).to.have.property('followers').to.be.an('array').to.be.ofSize(0);
        expect(newProfile).to.have.property('followersNumber').to.equals(4000);
        expect(newProfile).to.have.property('userArts').to.be.an('array').to.be.ofSize(0);
        expect(newProfile).to.have.property('userFavoritesArts').to.be.an('array').to.be.ofSize(0);
    })

    it('TEST12: it should adds a new art in to a userArts', () =>{

        profile1.addArt(art);

        expect(profile1.userArts).to.be.ofSize(1);
        expect(profile1.userArts[0]).to.have.property('name').to.equals('uzumaki');
        expect(profile1.userArts[0]).to.have.property('tags').to.be.ofSize(2);
        expect(profile1.userArts[0]).to.have.property('date');
    })

    it("TEST13: it should return a art from a user", () =>{

        var art1 = profile1.getOneArt('5bddaa84da0ba0111f2bf270');

        expect(art1).to.have.property('name').to.equals('uzumaki');
        expect(art1).to.have.property('tags').to.be.ofSize(2);
        expect(art1).to.have.property('date');
    })

    it('TEST14: it should add a art in to a userFavoriteArts', () =>{

        profile2.addFavoriteArt(art);

        expect(profile2.userFavoritesArts).to.be.ofSize(1);
        expect(profile2.userFavoritesArts[0]).to.have.property('name').to.equals('uzumaki');
        expect(profile2.userFavoritesArts[0]).to.have.property('tags').to.be.ofSize(2);
        expect(profile2.userFavoritesArts[0]).to.have.property('date');
    })

    it('TEST15: it should removes a art from userArts', () =>{

        profile1.removeArt('5bddaa84da0ba0111f2bf270')

        expect(profile1.userArts).to.be.ofSize(0);
    })

    it("TEST15: it should removes a art from the userFAvoritesArts", () =>{

        profile2.removeFavoriteArt('5bddaa84da0ba0111f2bf270');

        expect(profile2.userFavoritesArts).to.be.ofSize(0);        
    })
})