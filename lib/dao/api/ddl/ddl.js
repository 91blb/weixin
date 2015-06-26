var redis = require("redis");
var client = redis.createClient(6379, 'www.51blb.com', {});
var RSVP=require("rsvp");
console.log(RSVP);
// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function(err) {
    console.log("Error " + err);
});

/*所有符合 data resolve reject 都可以转换成 data cb
	所有符合data cb 都可以转换成 promise结构
*/
function addConstraints(constraint,cb){
	/*约定 constraint的数据结构
		name   约束名称
		table  表名称
		type   约束类型    唯一约束  非空约束  域约束
		fields   作用字段  可以是多个
	*/
	var table=constraint.table;
	var name=constraint.name;
	var uid="meta:constraint:"+table+":"+name;
	var args=[uid];
	for(var p in constraint){
		args.push(p);
		args.push(constraint[p]);
	}
	args.push(cb);
	client.hmset.apply(client,args);
}
function addConstraints_P(constraint){
	var promise = new RSVP.Promise(function(resolve, reject){
		console.log("in excute");
		addConstraints(constraint,function(err,reply){
			console.log("callback");
			console.log(arguments);
			resolve(err,reply);//
		});
	});
	return promise;
}
function addIndex(){
	
}

function queryConstraints(){

}

function queryIndex(){

}

var constraint={
	table:"user",
	name:"c_mobile",
	type:"unique",
	fields:"mobile",/*要求user表 name 字段不重复*/
	values:""
}
function cb(err,reply){
	cosnole.log();
	console.log(arguments);
}
//addConstraints(constraint,cb);
var x=addConstraints_P(constraint);
console.log(x);
// .then(function(err,replay){
// 	console.log("final cb",argumets);
// },function(error){
// 	console.log("error");
// });