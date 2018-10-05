const memoryCache = require('memory-cache');
var cache = new memoryCache.Cache();

exports.put = function(key, value, time, callback){

	var call = callback || function(key, value){

		console.log(key + ': ' + value +' has dissaper');
	}
	cache.put(key, value, time, call);
}

exports.get = function(key){

	return cache.get(key);
}

exports.delete = function(key){

	cache.del(key);
}

exports.deleteAll = function(){

	cache.clear();
}

exports.len = function(){

	return cache.size();
}

exports.getAllKeys = function(){

	return cache.keys();
}

exports.getJSON = function(){

	return cache.exportJson();
}

