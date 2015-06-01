var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url = "";
var app_id = "wx4b6e962611f5e662";
var app_secret = "78f0744a1d73bbbd423859840fd1255d";

var RSVP = require('rsvp');
//console.log("RSVP",RSVP);
function getURL (url){
	var promise = new RSVP.Promise(function(resolve, reject) {
	  // succeed 
	  var request=require("request");
	  request(url,function(err,res,body){
	  	if(err) reject(err);
	  	else	resolve(body);
	  })
	  // or reject 
	});
	return promise;
}

function getAccessToken() {

	console.log("timestamp", timeStamp);

	//if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	url += "&appid=" + app_id;
	url += "&secret=" + app_secret;

	return getURL(url);
}

function getCardTicket(result){
	var data=JSON.parse(result);
	var access_token=data.access_token;

	var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=wx_card";
	url += "&access_token=" + access_token;
	return getURL(url);

}

function main(){
	getAccessToken()
	.then(getCardTicket)
	.then(function(result){
		var data=JSON.parse(result);
		console.log("getCardTicket",data);
	})
	.catch(function(err){

	});
}

function gensignature(){
	var arr=["api_ticket","timestamp","card_id","code","openid","balance"];

	var obj={};
	obj.api_ticket="E0o2-at6NcC2OsJiQTlwlJfajP7HsS98gcJSBUdYmmTpx1sgpRLCWgM2M9kISeJ_PoSsgCmFwk8UprE2FF7jRA";
	obj.timestamp="1433151416";
	obj.card_id=
	obj.code="11211";
	obj.openid="oo2HJszH10xGXWv7U3XhnfL26_ew";
	//obj.
	timestamp、card_id、code、openid、balance

}
//module.exports=getAccessToken;
//getAccessToken();
main();