module.exports=function(req,res,opt){
	console.log("body",req.body);
	var mobile=req.body.mobile;
	var result={
		code:0,//领取红包成功
		amount:10,
		url:"https://m.nongfadai.com/register.html?code="+mobile,
		myBonusShareUrl:"http://www.baidu.com"//分享的地址 要带上一些额外的参数 后台辅助生成
	}
	return result;
	//var path=require("path");
	//return req.query;
	//res.sendFile("bonus.html",{ root: path.join(opt.basePath, '/web/src/') });


}