var check = require("../../lib/weixin/checkToken");
var bodyParser = require('body-parser')
	// create application/json parser 
var jsonParser = bodyParser.json()
	// create application/x-www-form-urlencoded parser 


var urlencodedParser = bodyParser.urlencoded({
	extended: false
})



module.exports = function(req, res, cb) { //微信校验
	var now = new Date();
	console.log("method", req.method);
	console.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " " + now.getMilliseconds());

	var support_get_flag = false; //调试标记

	if (req.method == "GET" && support_get_flag) {
		var query = req.query;

		var signature = query.signature;
		var timestamp = query.timestamp;
		var nonce = query.nonce;
		var echostr = query.echostr;


		console.log("wexin check", req.query);
		var result = check(signature, timestamp, nonce, echostr);
		console.log("check result=[" + result + "]");
		if (result) {
			return echostr; //如果校验通过 按照微信要求 原样返回echostr
		} else {
			return false;
		}
	} else {
		console.log("headers", req.headers);
		console.log("body", req.body);

		res.header('Content-Type', 'text/xml;charset=utf-8');

		var result = "";
		//result += '<?xml version="1.0" encoding="utf-8"?>';
		result += "<xml>";
		result += "<ToUserName><![CDATA[" + req.body.tousername + "]]></ToUserName>";
		result += "<FromUserName><![CDATA[" + req.body.fromusername + "]></FromUserName>";
		result += "<CreateTime>" + req.body.createtime + "</CreateTime>";
		result += "<MsgType><![CDATA[text]]></MsgType>";
		result += "<Content><![CDATA[你好>]]></Content>";
		result += "</xml>";
		
		console.log("return content:",result);
		return result;
	}
	//return result;
}