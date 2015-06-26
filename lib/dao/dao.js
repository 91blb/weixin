var redis = require("redis"),
    client = redis.createClient(6379, 'www.51blb.com', {});

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
    console.log("Error " + err);
});

function save(){
	client.
}






module.exports=save;