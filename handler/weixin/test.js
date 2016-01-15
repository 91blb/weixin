function main(){
	//生成一个要求weixin做oauth认证的url 
	console.log("本利保");
	var appid="wx4b6e962611f5e662";

	//console.log("农发贷");
	//var appid="wxdd2f29ae7d42c94d";

	//var myUrl="http://www.51blb.com/handler/weixin/bonus.html";
	var myUrl="http://www.51blb.com/handler/weixin/stock.html?a=10&b=20";
	var myUrl="https://itunes.apple.com/cn/app/com.nongfadai.ios/id1027197919";
	var baseUrl="https://open.weixin.qq.com/connect/oauth2/authorize?";
	var url=baseUrl+"appid=";
	url+=appid;
	url+="&redirect_uri=";
	url+=encodeURIComponent(myUrl);
	//url+="&response_type=code&scope=snsapi_userinfo";//需要用户授权
	url+="&response_type=code&scope=snsapi_base";//静默授权
	url+="&state=STATE&connect_redirect=1#wechat_redirect";

	console.log(url);
	return url;
}

main();
//var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60
