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

var sha1=require("sha1");

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

	var api_ticket="E0o2-at6NcC2OsJiQTlwlJfajP7HsS98gcJSBUdYmmRoWOqCvkFkku1whoZm8S_1jYdR5GoYhp1SXGrB6zglog";
	var timestamp="1433204183";
	var card_id="po2HJszYamo5Vqz5cR5xMQ-XtP7s";//卡券id
	//var code="11211";
	//var openid="oo2HJszH10xGXWv7U3XhnfL26_ew";//用户openid
	var sign="df93a946d51918414db58b1b16b50d6b1a8c93ed";

	var arr=[api_ticket,timestamp,card_id];
	var str=arr.sort().join("");
	var sign=sha1(str);
	console.log("sign",sign);
	//arr.push(api_ticket);
	//timestamp、card_id、code、openid、balance



}
//module.exports=getAccessToken;
//getAccessToken();
//main();

gensignature();