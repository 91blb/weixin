var redis=require("../api/client_p");
var seq=require("../bo.seq");
//console.log(redis);

redis.keys("*").then(function(result){
	console.log("result",result);
}).catch(function(err){

})

// redis.flushdb().then(function(result){
// 	console.log("result",result);
// }).catch(function(err){

// })
function uuid
function addAccount(account){
	var key="account:";
	redis.hmset("*").then(function(result){
		console.log("result",result);
	}).catch(function(err){

	})
}