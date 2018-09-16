const memoryCache = require('memory-cache');
var cache = new memoryCache.Cache();



cache.put('foo', 'bar');
console.log(cache.get('foo'));

cache.put('houdini', 'disappear', 100, function(key, value){
	console.log(key + ' did ' + value)
})

console.log('houdini will now ' + cache.get('houdini'));

setTimeout(function(){

	console.log('houdini is ' + cache.get('houdini'))
}, 200);


var newCache = new cache.Cache();

newCache.put('foo', 'newBaz');

setTimeout(function(){

	console.log('foo in old cache is ' + cache.get('foo'));
	console.log('foo in new cache is ' + newCache.get('foo'));
	console.log('houdini now is ' + cache.get('houdini'));
},200);