var promiseFactory = require("q").Promise,
    redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function(err) {
    console.log("uh oh", err);
});



client.keys("*register:wxuid*").then(function(result) {
    console.log("result", result);
}).catch(function() {
    console.log("error123", arguments);
})
var key="table:register:wxuid:owGfFuDyDONoyurc9kAYubXHuVrw";
// client.del(key)
// .then(function(result){
// 	console.log(result);
// })
//var
//client.delete("owGfFuDyDONoyurc9kAYubXHuVrw")
// var key="table:register:wxuid:owGfFuIELTI4_k-jgmgN078L6azM";
// client.hgetall(key).then(function(result){
// 	console.log("result",result);
// }).catch(function(){
// 	console.log("error123",arguments);
// })

module.exports = client;