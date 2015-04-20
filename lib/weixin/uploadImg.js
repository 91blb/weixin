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

function uploadImage(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/cgi-bin/menu/create"
		url += "?access_token=" + token;

		var body = {
			"button": [{
				"type": "view",
				"name": "我要投资",
				"key": "V1001_TODAY_MUSIC",
				"url": "http://www.51blb.com"
			}, {
				"type": "view",
				"name": "福利专区",
				"key": "V1002_TODAY_MUSIC",
				"url": "http://www.51blb.com"
			}, {
				"name": "客服中心",
				"sub_button": [{
					"type": "click",
					"name": "文本消息",
					"key": "CMD1"
				}, {
					"type": "click",
					"name": "图文消息",
					"key": "CMD2"
				}, {
					"type": "click",
					"name": "图片",
					"key": "CMD3",
				}, {
					"type": "click",
					"name": "音乐",
					"key": "CMD4",
				}]
			}]
		};
		var opt = {
			url: url,
			json: true,
			body: body
		}
		request.post(opt, function(err, res, body) {
			//var jsonObj = JSON.parse(body);
			console.log("body", body);
			//jsonObj.timeStamp = timeStamp;
			//fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(jsonObj), encoding);
			//cb && cb(jsonObj);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}

var formData = {
  // Pass a simple key-value pair
  my_field: 'my_value',
  // Pass data via Buffers
  my_buffer: new Buffer([1, 2, 3]),
  // Pass data via Streams
  my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
  // Pass multiple values /w an Array
  attachments: [
    fs.createReadStream(__dirname + '/attachment1.jpg'),
    fs.createReadStream(__dirname + '/attachment2.jpg')
  ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
  // Use case: for some types of streams, you'll need to provide "file"-related information manually.
  // See the `form-data` README for more information about options: https://github.com/felixge/node-form-data
  custom_file: {
    value:  fs.createReadStream('/dev/urandom'),
    options: {
      filename: 'topsecret.jpg',
      contentType: 'image/jpg'
    }
  }
};
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});


uploadImage();