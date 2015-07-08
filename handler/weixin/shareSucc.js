var redis=require("../../lib/redis/api/redis_promise");
//console.log(redis);


module.exports=function(req,res,opt){
	console.log("share succ body",req.body);
	var wxuid=req.body.wxuid;	
	var source=req.body.source;//来源
	var sharetype=req.body.sharetype;//分享方式 朋友圈 朋友

	var key_share="table:shareweixin:uuid:"+redis.nextSeq("shareweixin");/*read 点击过某人分享链接的人*/
	redis.savejson(shareweixin,{wxuid:wxuid,readtime:new Date(),source:source,sharetype:sharetype})
	.then(function(result){
		console.log("save share record result",result);
	})
	.catch(function(err){
		console.log("save share record err",err);
	})

	return 0;

}