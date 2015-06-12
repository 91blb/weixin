var redis = require("redis"),
	client = redis.createClient(6379, 'www.51blb.com', {});

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
	console.log("Error " + err);
});

//client.set("foo_rand000000000000", "OK");
client.set("key2", "string val2", redis.print);
//client.end();

