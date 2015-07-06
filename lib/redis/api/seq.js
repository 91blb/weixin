var redis=require("../api/client_p");
//console.log(redis);

// redis.keys("*").then(function(result){
// 	console.log("result",result);
// }).catch(function(err){

// })

function curr(name){
	var key="seq:"+name;
	return redis.get(key);
}
function next(name){
	var key="seq:"+name;
	return redis.incr(key);
}

function test(){
	get("account").then(function(result){
		console.log("curr seq",result);
	});

	next("account").then(function(result){
		console.log("next seq",result);
	});
}

//test();

module.exports={
	curr:curr,
	next:next
}