var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url = "";
var getAccessToken = require("./getAccessToken");

function getColors(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/card/getcolors";
		url += "?access_token=" + token;

		

		//var url = "http://service.com/upload";
		//var url = "http://127.0.0.1:3000/handler/upload/reciever";
		request.get({
			url: url
		}, function optionalCallback(err, httpResponse, body) {
			if (err) {
				return console.error('get colors failed:', err);
			}
			console.log('get colors result', body);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}



getColors();