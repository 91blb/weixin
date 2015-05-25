var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url = "";


function getOuthToken(code,cb) {
	var app_id = "wx4b6e962611f5e662";
	var app_secret = "78f0744a1d73bbbd423859840fd1255d";

	console.log("timestamp", timeStamp);

	//if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&appid=" + app_id;
	url += "&secret=" + app_secret;
	url += "&code=" + code;

	//var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3eb0718281190cf6&secret=6ff53b417eb39296fc92134c0e0d04bd";
	request.get(url, function(err, res, body) {
		var jsonObj = JSON.parse(body);
		console.log("body", body);
		//jsonObj.timeStamp = timeStamp;
		//fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(jsonObj), encoding);
		cb && cb(jsonObj);
	});
	//} else {
	//cb && cb();
	//}
}
module.exports=getOuthToken;
var oid="0318ea2a2bb1a57caf207acc1e553dbV";
var oid="03126a9cb909f750a1ba8050c46efc6x";
getOuthToken(oid);