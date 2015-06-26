var redis=require("../api/client_p");
//console.log(redis);

// redis.keys("*").then(function(result){
// 	console.log("result",result);
// }).catch(function(err){

// })

function get(name){
	var key="seq:"+name;
	return redis.incr(key);
}


function test(){
	get("account").then(function(result){
		console.log("result",result);
	});
}

test();