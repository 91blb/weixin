var WechatAPI = require("../index.js");
//console.log("本利保");
var app_id = "wx4b6e962611f5e662";
var app_secret = "78f0744a1d73bbbd423859840fd1255d";
var api = new WechatAPI(app_id, app_secret);

function main() {
	console.log(api);


	// api.getColors(function(err, data, res){
	// 	console.log("result",data);
	// })


	// api.getCards(0, 10, function(err, data, res) {
	// 	console.log("getCards", data);

	// });

	// api.getCard("po2HJs0Es90XhygVjNav86uQ5BY8", function(err, data, res) {
	// 	console.log("getCard", data.card.gift.base_info);
	// })
	var logo_url = 'http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40H9FjTsMOrsrYbyxJ1icH7UR9UL5RxN4E1zbiaN30SlKSV0cFGybNwGpAebKzprbH5TruD4LLKHBpAg/0?wx_fmt=png';

	var card = {
		"card_type": "GROUPON",
		"groupon": {
			"base_info": {
				"logo_url": logo_url,
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
					"begin_timestamp": 1432563704,
					"end_timestamp": 1432563904
				},
				"sku": {
					"quantity": 50000000
				},
				"get_limit": 3,
				"use_custom_code": false,
				"bind_openid": false,
				"can_share": true,
				"can_give_friend": true,
				"location_id_list": [],
				"custom_url_name": "立即使用",
				"custom_url": "http://www.qq.com",
				"custom_url_sub_title": "6 个汉字tips",
				"promotion_url_name": "更多优惠",
				"promotion_url": "http://www.qq.com",
				"source": "大众点评"
			},
			"deal_detail": "以下锅底2 选1（有菌王锅、麻辣锅、大骨锅、番茄锅、清补凉锅、酸菜鱼锅可"
		}
	};
	api.createCard(card, function(err, data, res) {
		console.log("createCard", data);
	})

}
main();