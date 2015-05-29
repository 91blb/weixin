var RSVP = require('rsvp');
 
//console.log("RSVP",RSVP);
var getURL=function(url){
	var promise = new RSVP.Promise(function(resolve, reject) {
	  // succeed 
	  var request=require("request");
	  request(url,function(err,res,body){
	  	if(err) reject(err);
	  	else	resolve(body);
	  })
	  // or reject 
	});
	return promise;
}


getURL("http://m.nongfaidai.com").then(function(){

	//前一个的输出作为下一项的输入
	console.log("succ1");
	return getURL("http://m.nongfaidai.com/project_list.html");
},function(err){
	console.log("step1 fail");
}).then(function(){
	console.log("succ2");
	//var args=arguments;
	//console.log("0",args[0]);
}).catch(function(err){
	console.log(err);
});
