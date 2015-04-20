var check = require("../../lib/weixin/checkToken");
var bodyParser = require('body-parser')
	// create application/json parser 
var jsonParser = bodyParser.json()
	// create application/x-www-form-urlencoded parser 


var urlencodedParser = bodyParser.urlencoded({
	extended: false
})


var wechat = require('wechat');
var config = {
	token: 'randomstr123QQ',
	appid: 'wx4b6e962611f5e662',
	encodingAESKey: 'gNxHP8Dwa3LJF6dRg0yKf9GZgYS3IHuA95AGBA2sD2Q'
};


module.exports = function(req, res, cb) { //微信校验
	var now = new Date();
	console.log("method", req.method);
	console.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " " + now.getMilliseconds());

	var support_get_flag = true; //调试标记

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
		var process=wechat(config, function(req, res, next) {
			// 微信输入信息都在req.weixin上
			var message = req.weixin;
			console.log("!!!!weixinmsg",message);
			if (message.FromUserName === 'diaosi') {
				// 回复屌丝(普通回复)
				res.reply('hehe');
			} else if (message.FromUserName === 'text') {
				//你也可以这样回复text类型的信息
				res.reply({
					content: 'text object',
					type: 'text'
				});
			} else if (message.FromUserName === 'hehe') {
				// 回复一段音乐
				res.reply({
					type: "music",
					content: {
						title: "来段音乐吧",
						description: "一无所有",
						musicUrl: "http://mp3.com/xx.mp3",
						hqMusicUrl: "http://mp3.com/xx.mp3",
						thumbMediaId: "thisThumbMediaId"
					}
				});
			} else {
				// 回复高富帅(图文回复)
				res.reply([{
					title: '你来我家接我吧',
					description: '这是女神与高富帅之间的对话',
					picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
					url: 'http://nodeapi.cloudfoundry.com/'
				}]);
			}
		});
		console.log("do process",typeof("process"));
		process(req,res);
		return;
		console.log("headers", req.headers);
		console.log("body", req.body);

		res.header('Content-Type', 'text/xml');

		var result = "";
		//result += '<?xml version="1.0" encoding="utf-8"?>';
		var xml = req.body.xml || {};
		result += "<xml>";
		result += "<ToUserName><![CDATA[" + xml.fromusername + "]]></ToUserName>";
		result += "<FromUserName><![CDATA[" + xml.tousername + "]]></FromUserName>";
		result += "<CreateTime>" + xml.createtime + "</CreateTime>";
		result += "<MsgType><![CDATA[text]]></MsgType>";
		result += "<Content><![CDATA[你好,测试被动推送消息]]></Content>";
		result += "</xml>";

		console.log("return content:", result);
		return result;
	}
	//return result;
}