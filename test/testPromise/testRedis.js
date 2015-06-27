var redis = require("redis");
var client = redis.createClient(6379, 'www.51blb.com', {});
var RSVP = require("rsvp");

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
    console.log("Error " + err);
});

function setData_p() {
    var promise = new RSVP.Promise(function(resolve, reject) {
        //client.hset("weixin_conf", "a1", "1", redis.print);
        client.keys("*",function(err, reply) {
            //console.log(arguments);
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(reply); // Will print `OK`
                resolve(reply);
            }
        });
    })
    return promise;
}
function getKeys_p(){
    var promise = new RSVP.Promise(function(resolve, reject) {
        //client.hset("weixin_conf", "a1", "1", redis.print);
        client.keys("*",function(err, reply) {
            //console.log(arguments);
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(reply); // Will print `OK`
                resolve(reply);
            }
        });
    })
    return promise;
}

setData_p().then(function(result){
	console.log("result",result);
    var promise = new RSVP.Promise(function(resolve, reject) {
        //client.hset("weixin_conf", "a1", "1", redis.print);
        client.keys("*",function(err, reply) {
            //console.log(arguments);
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(reply); // Will print `OK`
                resolve(reply);
            }
        });
    })
    return promise;
}).then(function(){
    console.log("get Keys",result);
});