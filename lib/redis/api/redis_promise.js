var Q=require("q");
var promiseFactory = require("q").Promise,
	redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function(err) {
	console.log("uh oh", err);
});
client.savejson = function(key, obj) {
	var args = [key];
	obj.__key=key;
	for (var p in obj) {
		args.push(p);
		args.push(obj[p]);
	}

	var fun = client.hmset;
	return fun.apply(client, args);
	//client.hmset(key,a1,v1,a2,v2)
}

function curr(name){
	var key="seq:"+name;
	return client.get(key);
}
function next(name){
	var key="seq:"+name;
	return client.incr(key);
}

client.getAllData=function(tableName){/*orderby 排序函数，filter过滤函数 groupby分组统计函数*/
	var key="table:"+tableName+":*";
	return client.keys(key)
	.then(function(results){
		//console.log("key results",results);
		var promises=[];
		for(var i=0;i<results.length;i++){
			promises.push(client.getKeyData(results[i]));
		}
		return Q.allSettled(promises)
	})
	.then(function(results){
		//console.log("data results",results);
		var arr=[];
		for(var i=0;i<results.length;i++){
			arr.push(results[i].value);
		}
		return Q.fcall(function(){
			return arr;
		});
	}).catch(function(error){
		return Q.fcall(function(){
			return [];
		});
	});

}

/**
清除表所有数据，包括数据、索引等
*/
client.clearAllData=function(tableName){
	var key="[index|table]*:"+tableName+":*";
	return client.keys(key)
	.then(function(results){
		return client.del(results);
	}).then(function(size){
		return Q.fcall(function(){
			return size;
		});
	}).catch(function(error){
		return Q.fcall(function(){
			return -1;
		});
	});
}

client.getKeyData=function(key){
	return client.hgetall(key);
}

client.getFiledValue=function(key,filed){
	return client.hget(key,filed);
}

client.currSeq=curr;
client.nextSeq=next;

module.exports = client;

//测试
//test();

function test() {
	function testSave() {
		client.savejson("table:test:uuid:33", {
				name: "123",
				value: 3
			})
			.then(function(result) {
				console.log("savejson result", result);
			})
			.catch(function(err) {
				console.log("err", err);
			});
	}

	function testQuery() {
		var key = "table:test:uuid:33";
		client.hgetall(key)
			.then(function(result) {
				console.log("query result", result);
			})
			.catch(function(err) {
				console.log("query err", err);
			})
	}

	function testKey(){
		var key="[index|table]*:account:*";
		client.keys(key)
		.then(function(results){
			console.log("results",results);
		})
	}

	//testQuery();
	testKey();
}