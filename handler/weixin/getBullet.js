var redis=require("../../lib/redis/api/redis_promise");
//console.log(redis);

module.exports=function(req,res,opt){
	/*当分享成功后 主动调用服务器端服务，记录下来分享人 分享时间 等等*/
	console.log("body",req.body);
	var mobile=req.body.mobile;
	var wxuid=req.body.wxuid;
	var source=req.body.source;//来源

	var key="table:register:wxuid:"+wxuid;
	var data={
		wxuid:wxuid,
		mobile:mobile,
		source:source
	}

	redis.savejson(key,data)
	.then(function(result){
		console.log("save recommed relation result",result);
	})
	.catch(function(err){
		console.log("save recommed relation err",err);
	});
	var shareUrl=getAuthUrl(mobile,wxuid);
	var result={
		code:0,//领取红包成功
		amount:180,
		url:"https://m.nongfadai.com/channelRegister.html?channel=weixin&phone="+mobile,
		myBonusShareUrl:shareUrl//分享的地址 要带上一些额外的参数 后台辅助生成//分享的地址要重新带上用户的参数信息，比如
	}
	return result;

}