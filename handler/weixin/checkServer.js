var check=require("../../lib/weixin/checkToken");
var bodyParser = require('body-parser')
// create application/json parser 
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser 


var urlencodedParser = bodyParser.urlencoded({ extended: false })



module.exports=function(req,res,cb){//微信校验

	console.log("method",req.method);
	if(req.method=="GET"){
		var now=new Date();
		var query=req.query;
		
		var signature=query.signature;
		var timestamp=query.timestamp;
		var nonce=query.nonce;
		var echostr=query.echostr;
		
		console.log(now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+" "+now.getMilliseconds());

		console.log("wexin check",req.query);
		var result=check(signature,timestamp,nonce,echostr);
		console.log("check result=["+result+"]");
		if(result){
			return echostr;//如果校验通过 按照微信要求 原样返回echostr
		}
		else{
			return false;
		}
	}
	else{
		console.log("body",req.body);
		return req.body;
	}
	//return result;
}