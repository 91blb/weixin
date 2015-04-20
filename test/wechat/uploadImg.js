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
var formstream=require("formstream");
var urllib=require("urllib");
function sendRequest(url, opts, callback) {
	var options = {};
	//extend(options, this.defaults);
	for (var key in opts) {
		if (key !== 'headers') {
			options[key] = opts[key];
		} else {
			if (opts.headers) {
				options.headers = options.headers || {};
				console.log("opts.headers",opts.headers);
				console.log("");
				options.headers=opts.headers;
				//extend(options.headers, opts.headers);
			}
		}
	}
	urllib.request(url, options, callback);
}

function uploadImage(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "http://api.weixin.qq.com/cgi-bin/material/add_material";
		url += "?access_token=" + token;


		var filepath = __dirname + "/logo.png";
		var callback = function() {
			console.log("send request callback");
			console.log(arguments);
		};
		var type = 'image';
		fs.stat(filepath, function(err, stat) {
			if (err) {
				return callback(err);
			}
			var form = formstream();
			form.file('media', filepath, path.basename(filepath), stat.size);
			var url2 = url + '&type=' + type;
			console.log("url2",url2);
			var opts = {
				dataType: 'json',
				type: 'POST',
				timeout: 60000, // 60秒超时
				headers: form.headers(),
				stream: form
			};
			sendRequest(url2, opts, callback);
		});
		//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
	});
}
uploadImage();