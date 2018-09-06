
const express = require('express');
const app = express();

app.listen(3000, () => console.log("app running at port 3000"));

app.use(function (req, res, next) { 

	res.setHeader('Content-Type', 'application/json'); 
	next();	
});

//----------------------INFO----------------------//
var Info = function(name, old){

	this.name = name;
	this.old = old;
}

var info1 = new Info("Thaynnara", 21);
var info2 = new Info("Gabriel", 21);
var info3 = new Info("Clara", 22);

//---------------PROFILE-------------------------//
var Profile = function(info, following, id){

	this.info = info;
	this.following = following;
	this.id = id;
}

var person = new Profile(info1, 40, 1);
var anotherPerson = new Profile(info2, 36, 2);
var otherPerson =  new Profile(info3, 45, 3);

profiles = [person, anotherPerson, otherPerson];

//--------------------ART--------------------------//
var Art = function(imgLink, tags, id){

	this.imgLink = imgLink;
	this.tags = tags;
	this.id = id;
}
art1 = new Art('https://cdn.shopify.com/s/files/1/0558/2081/products/ATCAWM_FC_1024x1024.jpg?v=1534804643',
		['adventure time', 'fanart', 'finn', 'jake'], 1);

art2 = new Art('https://cdn.vox-cdn.com/thumbor/q0ujcr0H33ybBRUUNNFL1QVBAKY=/0x0:1920x1080/1200x800/filters:focal(760x282:1066x588)/cdn.vox-cdn.com/uploads/chorus_image/image/61137005/adventure_time_stakes.0.jpg',
		['adventure time', 'marceline', 'bonnibel'], 2)

arts = [art1, art2];

//----------------------------------------------------//

app.get('/profile', (req, res) =>{ 

	res.json(profiles);
});

app.get('/profile/arts', (req, res) =>{

	res.json([arts]);
});

app.get('/profile/arts/:id', (req, res) =>{ 

	var id = req.params.id
	res.json(arts[id]);
});

app.get('/profile/following', (req, res) =>{

	names = ["clara", "gabriel", "igor", "sophia"];
	res.json(names);
});

app.get('/profile/following/:id', (req, res) =>{

	var id = req.params.id;
	res.json(profiles[id]);
})