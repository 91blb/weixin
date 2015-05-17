function main(){
	
	var appid="wx4b6e962611f5e662";
	var myUrl="http://www.51blb.com/handler/weixin/bonus.html";
	var baseUrl="https://open.weixin.qq.com/connect/oauth2/authorize?";
	var url=baseUrl+"appid=";
	url+=appid;
	url+="&redirect_uri=";
	url+=encodeURIComponent(myUrl);
	url+="&response_type=code&scope=snsapi_userinfo";
	url+="&state=STATE&connect_redirect=1#wechat_redirect";

	console.log(url);
}

main();
//var url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60
