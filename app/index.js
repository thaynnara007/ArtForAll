const express = require('express');
const app = express();

app.listen(3000, () => console.log("app running at port 3000"));

app.use(function (req, res, next) {

	res.header('Content-Type', 'application/jason');
	next();	
});

app.get('/profile', (req, res) =>{

	res.send(JSON.stringify({name:"Thaynnara", old:"21", following:40, id:1}))
});

app.get('/profile/arts', (req, res) =>{

	res.send(JSON.stringify({img:'https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwigw-P_yJ3dAhXBkpAKHZidABAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.kidrobot.com%2Fcollections%2Fadventure-time-x-kidrobot&psig=AOvVaw20QPijfG3CRmcB-16ID32N&ust=1536020651358193',
							tags:['adventure time', 'fanart', 'chibi'],
							id:1,
							img:"sdasdad",
							tags:["boku no hero", 'original'],
							id:2}));
});

app.get('/profile/arts/{id}', (req, res) =>{

		res.send(JSON.stringify({img:'https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwigw-P_yJ3dAhXBkpAKHZidABAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.kidrobot.com%2Fcollections%2Fadventure-time-x-kidrobot&psig=AOvVaw20QPijfG3CRmcB-16ID32N&ust=1536020651358193',
							tags:['adventure time', 'fanart', 'chibi'],
							id:1}));
});

app.get('/profile/following', (req, res) =>{

	res.send(JSON.stringify({name:"gabriel",
							name:"clara"}));
});