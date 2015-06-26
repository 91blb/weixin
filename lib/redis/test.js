var redis = require("redis"),
    client = redis.createClient(6379, 'www.51blb.com', {});

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
    console.log("Error " + err);
});

client.hset("user:1", "name","1", redis.print);
client.hset("user:1", "sex","2", redis.print);
client.hset("user:1", "birthday","3", redis.print);
client.hset("user:2", "name","21", redis.print);
client.hset("user:2", "sex","22", redis.print);
client.hset("user:2", "birthday","23", redis.print);

client.keys("user:*",function(err, reply) {//一个表的全部数据 
	console.log(arguments);
	if (err) {
		console.log(err);
	} else {
		console.log(reply); // Will print `OK`
	}
});

client.hgetall("user:2",function(err, reply) {//某个特定数据
	console.log(arguments);
	if (err) {
		console.log(err);
	} else {
		console.log(reply); // Will print `OK`
	}
});
// client.get("string key", function(err, reply) {
// 	console.log(arguments);
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(reply); 
// 	}
// });
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function(err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function(reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });