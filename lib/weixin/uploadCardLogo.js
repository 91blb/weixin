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


function uploadImage(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/cgi-bin/menu/create";
		var url = "https://api.weixin.qq.com/cgi-bin/media/uploadimg";
		//https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=ACCESS_TOKEN
		url += "?access_token=" + token;

		var formData = {
			// Pass a simple key-value pair
			//my_field: 'my_value',
			// Pass data via Buffers
			//my_buffer: new Buffer([1, 2, 3]),
			// Pass data via Streams
			//buffer: fs.createReadStream(__dirname + '/../../web/src/logo.png'),
			// Pass multiple values /w an Array
			//attachments: [
			//  fs.createReadStream(__dirname + '/attachment1.jpg'),
			//  fs.createReadStream(__dirname + '/attachment2.jpg')
			//],
			// Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
			// Use case: for some types of streams, you'll need to provide "file"-related information manually.
			// See the `form-data` README for more information about options: https://github.com/felixge/node-form-data
			//var imgUrl=;
			//var imgUrl=__dirname + '/../../web/src/img/redbag/bayman_240.jpg';

			buffer: {
				value: fs.createReadStream(__dirname + '/../../web/src/logo.png'),
				options: {
					filename: 'bayman_240.jpg',
					contentType: 'image/jpg'
				}
			}
		};

		//var url = "http://service.com/upload";
		//var url = "http://127.0.0.1:3000/handler/upload/reciever";
		request.post({
			url: url,
			formData: formData
		}, function optionalCallback(err, httpResponse, body) {
			if (err) {
				return console.error('upload failed:', err);
			}
			console.log('Upload successful!  Server responded with:', body);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}

function uploadImage2() {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];

		var imgFile="../../web/src/logo.png";
		var imgFile="../../web/wx_upload_img/peach_128.png";//http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40E0SqeX4W3yoULD1EibiapTXJ5BEgd7IOWdtc1BVH5RDRjpgtuwlvxQiby7BssqY8Qs98pxIN30V1s3Q/0
		var imgFile="../../web/wx_upload_img/bayman_240.jpg";//http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40EhwpXMXLFdWGiaA5FmiauibkyqXyCRa6BNC1icDkP7p1icpPv7BpCKibobqrt1icIbkCV8OfwiaUI6aNYiatg/0

		var filepath = path.resolve(__dirname, imgFile);
		fs.stat(filepath, function(err, stat) {
			if (err) {
				return callback(err);
			}
			var form = formstream();
			form.file('media', filepath, path.basename(filepath), stat.size);
			var url = "https://api.weixin.qq.com/cgi-bin/media/uploadimg";

			url+="?access_token=" + token;

			var opts = {
				dataType: 'json',
				type: 'POST',
				timeout: 60000, // 60秒超时
				headers: form.headers(),
				stream: form
			};
			console.log("headers",opts.headers);
			//urllib.request(url, options, callback);
			urllib.request(url, opts, function(){
				console.log("post weixin return:",arguments);
			});
		});
	});

}


//uploadImage();

uploadImage2();


//got result 得到上传的图像文件
/*
http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40FTDILjtzh1QkPsqkVdiapj8JZNuRW9T1m0WVGRAW1qmz8dz4DicTsdz9w6tGqSIZ81BUiby96R4Dyug/0
*/