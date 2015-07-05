	var g_data = [{
		title: "百度首推的安全理财平台小牛在线，百万红包派不停。",
		abstract: "百度携手小牛在线引爆最赚理财季，小牛在线贴心派红包，让收益不停加码。"
	}, {
		title: "小牛新品重磅来袭，小伙伴们都知道了吗？1元起投，年化8.5%，灵活存取，强大备用金支持，安全可靠！",
		abstract: "活期牛重磅发布之际，小牛在线百万红包等你来，看得见的财富增长，别让您的资金再闲置喽！"
	}, {
		title: "《富盈人生》千万顶级风控项目热售，小牛在线百万红包约你来抢！",
		abstract: "在千万顶级风控项目-富盈人生热售之际，小牛在线百万红包震撼来袭，今天你抢了吗？"
	}];
	var g_urls = [
		"http://a1.qpic.cn/psb?/V10c5w0u04dUDy/uoyMKPv0aYSUcusggzrQSazXjTI*TeZkt6NSoPfL*ck!/b/dA8AAAAAAAAA&bo=PAA8AAAAAAABByA!&rf=viewer_4",	/*百度活动*/
		"http://a2.qpic.cn/psb?/V10c5w0u04dUDy/bQ7n0kcHm0IlTLZgKIIszq2MWyF7FhcKsLzWsVNPOLw!/b/dCUAAAAAAAAA&bo=PAA8AAAAAAABACc!&rf=viewer_4",	/*活期牛*/
		"http://a2.qpic.cn/psb?/V10c5w0u04dUDy/IJbM3Lbinrl4y7YFYllEuzL4FI.SnApql9Z3jGX1ea0!/b/dCgAAAAAAAAA&bo=PAA8AAAAAAABACc!&rf=viewer_4"		/*富盈人生*/
	];

	function g_log(msg) {
		if (/dev.xiaoniu88.com/.test(document.location.href)) {
			//msgDom.innerHTML+=msg+"<br/>";
			if (typeof(msg) == "object") {
				msg = JSON.stringify(msg);
			}
			var image = new Image();
			image.src = "/error?msg=" + msg;
		}
	}

	function getTicketBack(result) {
		var data = {
			timestamp: "1426509033",
			nonceStr: "D2AE4FD7431A872114C05E67864B17D1",
			signature: "4effc9de17e8bb1d8856b1d65b101ac0b97bc8b9",
		};

		if (result && result.data) {
			data = result.data;
			//g_log(JSON.stringify(data));
		}

		//alert(data.timestamp);
		//alert(data.nonceStr);
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'wx3eb0718281190cf6', // 必填，公众号的唯一标识
			//appId:"wxa1d1ccd49006b0c5",//测试公众号
			timestamp: "" + data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline","hideMenuItems","onMenuShareQQ","onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});


		wx.ready(function() {
			wx.hideMenuItems({
				menuList: [
						"menuItem:share:qq",
						"menuItem:share:QZone",
						"menuItem:share:weiboApp",
						"menuItem:copyUrl",
						"menuItem:jsDebug",
						"menuItem:editTag",
						"menuItem:delete",
						"menuItem:originPage",
						"menuItem:readMode",
						"menuItem:openWithQQBrowser",
						"menuItem:openWithSafari",
						"menuItem:share:email",
						"menuItem:share:brand",
						"menuItem:favorite"
					] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});

			bindWeixinEvent(data);
			//alert("微信接口调用成功");
		});
		wx.error(function(res) {
			console.log("error", arguments);
			g_log("error" + res);
			if (/xiaoniu88\.com/.test(document.location.href)) {
				//alert("微信接口调用失败");
			}
		});


		function bindWeixinEvent(data) {
			//alert("shareURL:"+data.shareURL);
			window.g_url = data.shareURL;
			if (typeof(g_stage) == "undefined") {
				g_stage = 0;
			}
			var title = g_data[g_stage].title;
			var des = g_data[g_stage].abstract;
			var imgUrl = g_urls[g_stage];
			var linkUrl = window.g_url || document.location.href.split('#')[0];
			wx.onMenuShareTimeline({
				title: title + des, // 分享标题
				link: linkUrl, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					//alert("分享成功");
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
						
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: des, // 分享描述
				link: linkUrl, // 分享链接
				imgUrl: imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
					//alert("分享成功");
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareQQ({
				title: title, // 分享标题
				desc: des, // 分享描述
				link: linkUrl, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () { 
				   // 用户确认分享后执行的回调函数
				},
				cancel: function () { 
				   // 用户取消分享后执行的回调函数
				}
			});
			
			wx.onMenuShareWeibo({
				title: title, // 分享标题
				desc: des, // 分享描述
				link: linkUrl, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () { 
				   // 用户确认分享后执行的回调函数
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
			//alert("bindWeixinEvent succ");

		}
	}


	//if(/xiaoniu88.com/ig.test(document.location.host)){
	$.ajax({
		type: "POST",
		url: "/weixin/signature",
		data: {
			url: window.encodeURIComponent(document.location.href.split('#')[0]),
			force: 1
		},
		dataType: "json",
		success: getTicketBack
	});
	//}

	$(function() {
		var wx_mask = $("#wx_mask");
		var wx_mask_gz = $("#wx_mask_gz");
		var wx_mask_tip = $("#wx_mask_tip");
		/*分享弹出层*/

		$("#wx_btn_share").on("click", function() {
			if (navigator.appVersion.match(/MicroMessenger/i)) {
				wx_mask.show();
			} else {
				wx_mask_tip.show();
			}
		});

		$("#wx_btn_iknow,#wx_btn_iknow2,#wx_btn_iknow3,.wx_share_close").on("click", function() {
			$(".wx_mask").hide();
		});

		$(".wx_rule").on("click", function() {
			wx_mask_gz.show();
		});
		//禁用弹出层touchmove
		function disabledTouchMove(obj) {
				obj.addEventListener('touchmove', function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			}
			//disabledTouchMove(wx_mask[0]);
			//disabledTouchMove(wx_mask_gz[0]);
			//disabledTouchMove(wx_mask_tip[0]);

	});