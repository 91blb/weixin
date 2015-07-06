var promiseFactory = require("q").Promise,
    redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function (err) {
    console.log("uh oh", err);
});

client.saveObj=function(table,obj){//要求obj必须是基础数据格式
	var id="table:"+table+":uuid:"+obj.uuid;//不允许所有数据使用uuid字段
	var args=[id];
	for(var p in obj){
		args.push(p);
		args.push(obj[p]);//日期类型转换
	}

	return client.hmset.apply(client,args);;
}
// All your redis commands return promises now.
// client.set('mykey', 'myvalue')
//     .then(console.log)
//     .catch(console.log)

// client.get("mykey").then(function(result){
// 	console.log("result",result);
// }).catch(function(){
// 	console.log("error123",arguments);
// })

module.exports=client;