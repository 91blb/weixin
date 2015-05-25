var url="https://mmbiz.qlogo.cn/mmbiz/10ia0WIdm40H9FjTsMOrsrYbyxJ1icH7UR9UL5RxN4E1zbiaN30SlKSV0cFGybNwGpAebKzprbH5TruD4LLKHBpAg/0?wx_fmt=png";
var cardData = {
	"card": {
		"card_type": "GROUPON",
		"groupon": {
			"base_info": {
				"logo_url": url,
				"brand_name": "海底捞",
				"code_type": "CODE_TYPE_TEXT",
				"title": "132 元双人火锅套餐",
				"sub_title": "",
				"color": "Color010",
				"notice": "使用时向服务员出示此券",
				"service_phone": "020-88888888",
				"description": "不可与其他优惠同享 ",
				"date_info": {
					"type": 1,
					"begin_timestamp": 1397577600,
					"end_timestamp": 1422724261
				},
				"sku": {
					"quantity": 50000000
				},
				"get_limit": 3,
				"use_custom_code": false,
				"bind_openid": false,
				"can_share": true,
				"can_give_friend": true,
				"location_id_list": [123, 12321, 345345],
				"custom_url_name": "立即使用",
				"custom_url": "http://www.qq.com",
				"custom_url_sub_title": "6 个汉字tips",
				"promotion_url_name": "更多优惠",
				"promotion_url": "http://www.qq.com",
				"source": "大众点评"
			},
			"deal_detail": "以下锅底2 选1（有菌王锅、麻辣锅、大骨锅、番茄锅、清补凉锅、酸菜鱼锅可"
		}
	}
};


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

function addMenu(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/cgi-bin/card/create"
		url += "?access_token=" + token;

		var body = cardData;
		var opt = {
			url: url,
			json: true,
			body: body
		}
		request.post(opt, function(err, res, body) {
			//var jsonObj = JSON.parse(body);
			//console.log("args",arguments);
			console.log("body", body);
			//jsonObj.timeStamp = timeStamp;
			//fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(jsonObj), encoding);
			//cb && cb(jsonObj);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}


addMenu();