var redis = require("redis"),
	client = redis.createClient(6379, 'www.51blb.com', {
		detect_buffers: true
	});

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
	console.log("Error " + err);
});

//console.log(client);

client.get("key2", function(err, reply) {
	console.log(arguments);
	if (err) {
		console.log(err);
	} else {
		console.log(reply); // Will print `OK`
	}
});
// client.get(new Buffer("foo_rand000000000000"), function (err, reply) {
//        console.log(reply.toString()); // Will print `<Buffer 4f 4b>`
//    });
//client.end();