var check=require("../../lib/weixin/checkToken");
module.exports=function(req,res,cb){//微信校验
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
	if(result!="false"){
		return "true";
	}
	else{
		return "false";
	}
	//return result;
}