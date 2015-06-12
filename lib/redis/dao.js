var redis = require("redis"),
	client = redis.createClient(6379, 'www.51blb.com', {});

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
	console.log("Error " + err);
});

function logObj(obj){
	var arr=[];
	for(var p in obj){
		arr.push(p);
	}
	console.log(arr.sort());

}

//logObj(client);
//client.set("foo_rand000000000000", "OK");
//client.set("key2", "string val2", redis.print);
//client.end();

function genUUid(table){//与表有关，与id有关，如果没有id  不允许一条数据没有id

}

function save(obj,table){
	if(!obj.uuid){//如果数据没有uuid属性  要求能自动生成

	}
	else{
		client.hset(obj.uuid, "string val2", redis.print);
	}
}
function get(){

}
function rm(){
	
}

module.exports={
	save:save,//写操作
	get:get,//读操作
	rm:rm//删除操作
}
