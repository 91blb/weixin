var redis=require("../../lib/redis/api/redis_promise");
//console.log(redis);
function getAuthUrl(mobile,wxuid){
	//console.log("本利保");
	var appid="wx4b6e962611f5e662";

	//console.log("农发贷");
	//var appid="wxdd2f29ae7d42c94d";

	//var myUrl="http://www.51blb.com/handler/weixin/bonus.html";
	var myUrl="http://www.51blb.com/handler/weixin/stock.html?uid="+wxuid;
	var baseUrl="https://open.weixin.qq.com/connect/oauth2/authorize?";
	var url=baseUrl+"appid=";
	url+=appid;
	url+="&redirect_uri=";
	url+=encodeURIComponent(myUrl);
	//url+="&response_type=code&scope=snsapi_userinfo";//需要用户授权
	url+="&response_type=code&scope=snsapi_base";//静默授权
	url+="&state=STATE&connect_redirect=1#wechat_redirect";

	//console.log(url);
	return url;
}

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