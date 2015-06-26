var promiseFactory = require("q").Promise,
    redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function (err) {
    console.log("uh oh", err);
});

// All your redis commands return promises now.
// client.set('mykey', 'myvalue')
//     .then(console.log)
//     .catch(console.log)

client.get("mykey").then(function(result){
	console.log("result",result);
}).catch(function(){
	console.log("error123",arguments);
})