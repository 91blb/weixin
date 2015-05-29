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
	//console.log("本利保");
	//var app_id = "wx4b6e962611f5e662";
	//var app_secret = "78f0744a1d73bbbd423859840fd1255d";
	
	console.log("农发贷");
	var app_id = "wxdd2f29ae7d42c94d";
	var app_secret = "3f0fa91400b1c9c700d51cceba77509c";

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
//body {"access_token":"","expires_in":7200,"refresh_token":"OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpU2CI2yCbIE-UvvpSgUn3ydXxIt-YPs5tw9xc0WBHpxAh5jIvZH0EKGIQrThg71L-zO3Y3zFWDl7KK9kFDEYiV-g","openid":"oo2HJszH10xGXWv7U3XhnfL26_ew","scope":"snsapi_userinfo","unionid":"owGfFuIELTI4_k-jgmgN078L6azM"}

var act="OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpU0gmSDuV_SE1M6fodRRshTvVua9xmd3HlOMyvkqvVwQtIamh1PmD2XwwJz1N83EP8wI7-vY2CoT-pdrS_8phkIQ";
var act="OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpUpA7H9aEns8cpkAMKuJC9T9ewPsKTdytWTJlAt6f8zO_WUISIJ3aU3lIKdJ4m3HtGKbX4ujyfhDEaZBGER3N5UQ";
var oid="oo2HJszH10xGXWv7U3XhnfL26_ew";
var oid="oo2HJszH10xGXWv7U3XhnfL26_ew";


//body {"access_token":"","expires_in":7200,"refresh_token":"OezXcEiiBSKSxW0eoylIeCMNB60DqGZPUKDxkimyTYSfI20PIXDV1MDL4J_Op3D0mv2bgkf-p9wqbRWJ3cnKqDPAcaNtVxCi0nrI4IGsAQfa4AkC34BsWEMCvN4L8YBMduZyRusGvMCOlFA2vv7cgA","openid":"ombUFs1WDVa_rA0fjpHmoK2ROXbU","scope":"snsapi_userinfo","unionid":"owGfFuIELTI4_k-jgmgN078L6azM"}

var act="OezXcEiiBSKSxW0eoylIeCMNB60DqGZPUKDxkimyTYSfI20PIXDV1MDL4J_Op3D040Izh9X2YDmGX3a4FWEzSr44K1UMaCXeCGVAPXH6_72Z9MobG4sijTcKwe5sM5qUgidPzMxgVC96lVoBnCa1HA";
//var oid="oo2HJszH10xGXWv7U3XhnfL26_ew";
//var oid="ombUFs1WDVa_rA0fjpHmoK2ROXbU";
var oid="owGfFuIELTI4_k-jgmgN078L6azM";

//body {"access_token":"","expires_in":7200,"refresh_token":"OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpU7xfS9Jg_E_-V3INGRzBN1QvVMwJ38QXsjmfF9My653jDKWZywFL0v3Tj43wL8r9XINQBXV5Oo2PdVHEFXt-cOQ","openid":"oo2HJszH10xGXWv7U3XhnfL26_ew","scope":"snsapi_userinfo","unionid":""}
var act="OezXcEiiBSKSxW0eoylIeK4Ymwy-rglo-SRzvX3jguT1B73sXc1vuHKx_5zBbMpUPTqmisG095wgdb52T35cyyNVXiHaS5Ft_pKgpOfsY59IFBb5dvmSTRaA3XwTrG-fHWpEyjmh7clV3J6PDMgKlg";
var oid="owGfFuIELTI4_k-jgmgN078L6azM";
getUserInfo(act,oid);
