var redis = require("redis");
var client = redis.createClient(6379, 'www.51blb.com', {});\
var RSVP = require("rsvp");

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
	console.log("Error " + err);
});

function db(method, param) {
	var promise = new RSVP.Promise(function(resolve, reject) {
		var fn=client[method];
		fn.call(client,param,function(err,reply){
			
		})
	});
	return promise;
}

module.exports = db;