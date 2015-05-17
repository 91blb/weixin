var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url = "";


function getUserInfo(access_token,openid,cb) {
	var app_id = "wx4b6e962611f5e662";
	var app_secret = "78f0744a1d73bbbd423859840fd1255d";

	console.log("timestamp", timeStamp);

	//if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url="https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
	url="https://api.weixin.qq.com/sns/userinfo?lang=zh_CN";
	//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code//获取认证token
	url += "&access_token=" + access_token;
	url += "&openid=" + openid;

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
module.exports=getUserInfo;
getUserInfo('OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpU0gmSDuV_SE1M6fodRRshTvVua9xmd3HlOMyvkqvVwQtIamh1PmD2XwwJz1N83EP8wI7-vY2CoT-pdrS_8phkIQ','oo2HJszH10xGXWv7U3XhnfL26_ew');
