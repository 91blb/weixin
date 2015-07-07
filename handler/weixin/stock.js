console.log("getUserInfo");
console.log("本利保");
var app_id = "wx4b6e962611f5e662";
var app_secret = "78f0744a1d73bbbd423859840fd1255d";
var getSign = require("./getSign");
var getAuthUrl = require("./getAuthUrl");
var redis=require("../../lib/redis/api/redis_promise");

var RSVP = require('rsvp');
//console.log("RSVP",RSVP);
function getURL(url) {
	var promise = new RSVP.Promise(function(resolve, reject) {
		// succeed 
		var request = require("request");
		request(url, function(err, res, body) {
				if (err) reject(err);
				else resolve(body);
			})
			// or reject 
	});
	return promise;
}

function getOuthToken(code) {


	//console.log("农发贷");
	//var app_id = "wxdd2f29ae7d42c94d";
	//var app_secret = "3f0fa91400b1c9c700d51cceba77509c";

	//console.log("timestamp", timeStamp);

	//if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url = "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
		//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&appid=" + app_id;
	url += "&secret=" + app_secret;
	url += "&code=" + code;

	return getURL(url);
}

function getUserInfo(result) {
	console.log("get User Info result");
	console.log(result);

	var data = JSON.parse(result); //

	var access_token = data.access_token;
	var openid = data.unionid;

	console.log("access_token", access_token);
	console.log("openid", openid);

	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url = "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
	url = "https://api.weixin.qq.com/sns/userinfo?lang=zh_CN";
	//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&access_token=" + access_token;
	url += "&openid=" + openid;

	console.log("return a promise");
	return getURL(url);
}


function getUserInfoByAuth(code, cb) {
	getOuthToken(code)
		.then(getUserInfo)
		.then(function(result) {

		})
		.catch(function(err) {
			console.log("error", err);
		});
}

function log(obj) {
	var arr = [];
	for (var p in obj) {
		arr.push(p);
	}
	console.log(arr.sort().join("-"));
}
module.exports = function(req, res, opt) {
	var a = req.query.a || 0;
	//log(req);
	//console.log("req.url",req.url);
	var url = req.protocol + "://" + req.hostname + req.originalUrl;
	console.log("req.originalUrl", url);
	console.log("bonus query param:", req.query);
	//console.log(req.query);
	//console.log("opt",opt);
	var code = req.query.code;
	var data = {};
	//console.log("RSVP",RSVP);
	if (code) {
		getOuthToken(code)
			//.then(getUserInfo)
			.then(function(result) {
				data = JSON.parse(result);
				//data.headimgurl = data.headimgurl.replace(/\\/g, "");

				//判断用户是否已经领过红包,如果没有领过,则进入领红包页面
				//如果已经领过，则进入兑现红包页面

				return getSign(url);//获取url签名 用途 微信jssdk 分享功能
			})
			.then(function(result) {
				result.shareUrl = getAuthUrl(data.unionid);
				data.wxconf = JSON.stringify(result);

				//console.log("data.wxconf", data);
				//res.render("stock.vm", data);
				
				var key="table:register:wxuid:"+data.unionid;/*根据用户的微信id查找用户是否注册过*/
				console.log("redis key:",key);
				redis.hgetall(key)
				.then(function(result){
					console.log("check db result",result);

					if(result){//发现数据库中有记录了
						data.registerUrl="https://m.nongfadai.com/register.html?phone="+result.phone;
						res.render("stock2.vm", data);
					}
					else{
						res.render("stock.vm", data);
					}
				})
				.catch(function(err){
					console.log("check db err",err);
					res.render("stock.vm", data);
				});
			})
			.then(function(result){
				
			})
			.catch(function(err) {
				console.log("err", err);
				res.send(err);
			})
	} else {
		if (a) {
			//该页面必须要在微信中打开
			res.render("stock2.vm", {
				unionid: ""
			});
		} else {
			getSign(url)
				.then(function(result) {
					var data = {
						unionid: ""
					};
					result.shareUrl = getAuthUrl(data.unionid);
					data.wxconf = JSON.stringify(result);
					
					res.render("stock.vm", data);
				})
				.catch(function(err) {
					console.log(err, err);
				})
		}
	}
	//var path=require("path");
	//return req.query;
	//res.sendFile("bonus.html",{ root: path.join(opt.basePath, '/web/src/') });


}