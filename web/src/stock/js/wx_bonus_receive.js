$(function() {
    var $container = $("#container");
    var mask = $("#wx_mask");
    var maskTip = $("#wx_mask_tip");
    var wxInput = $("#wx_input");
    var wxInputTip = $("#wxInputTip");
    var submitBtn = $("#wx_btn_submit");
    console.log(submitBtn);

    var mobile = $("#mobile");
    var wxRedbagTip = $("#wxRedbagTip");


    /*maskTip.show();*/
    $("#wxRuleHandler").on("click", function() {
        mask.show();
    });
    $(".wx_btn_iknow,.wx_share_close").on("click", function() {
        maskTip.hide();
        mask.hide();
    });
    //禁用弹出层touchmove
    function disabledTouchMove(obj) {
        obj.addEventListener('touchmove', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
    }
    /**/
    mobile.on("focus", function() {
        wxInputTip.hide();
    }).on("keyup", function() {
        console.log("keydown");
        wxInput.removeClass("wx_input_error");
        wxInputTip.hide();
        if (checkPhone($(this).val())) {
            submitBtn.removeClass("wx_redbag_btn_disable");
        } else {
            submitBtn.addClass("wx_redbag_btn_disable");
        }
    });
    mobile.on("input", function() {
        //alert("change");
        //console.log("input");
        wxInput.removeClass("wx_input_error");
        wxInputTip.hide();
        if (checkPhone($(this).val())) {
            submitBtn.removeClass("wx_redbag_btn_disable");
        } else {
            submitBtn.addClass("wx_redbag_btn_disable");
        }
    })


    if (!navigator.appVersion.match(/MicroMessenger/i)) {
        //$(".wx_stage_info2,.wx_stage_money_con").hide();
        //$("#wxRedbagForm").html('<div style="text-align:center;margin-top:42px;margin-bottom:60px;font-size:14px; color:#353434;">请关注小牛在线微信公众号 xiaoniuzaixian<br>复制链接到微信中打开即可领取红包<br></div>');
        //return;
    }


    /*拆开红包按钮的提交事件 */
    submitBtn.on("click", function() {
        var $this = $(this);
        if ($this.hasClass("wx_redbag_btn_disable")) { //如果手机号是非法手机号
            mobile.focus();
            if (mobile.val() !== "") {
                if (!checkPhone(mobile.val())) {
                    wxInputTip.html("请输入13、14、15、18或17开头的11位手机号码").show();
                    wxInput.addClass("wx_input_error");
                }
            } else {
                wxInput.addClass("wx_input_error");
            }
            return false;
        };
        wxInputTip.hide();
        var param = {};
        param["mobile"] = mobile.val();
		param["wxuid"] = $("#weixin_uid").val();
        /*param["amount"] = "";*/
        $.ajax({
            url: "/handler/weixin/getBullet.json",
            beforeSend: function() {
                $this.html("正在拆开红包...").addClass("wx_stage_btn_disabled");
            },
            data: param,
            type: "post",
            dataType: "json",
            success: function(data) {
                var code = data.code;
                mobile.val("");
                if (code == "0") {
                    /*成功*/
                    $("#hint_1,#promot_1,#wx_input,#wx_btn_submit").hide();

                    $("#result_2").html("￥" + data.amount);
                    $("#wx_hint_money").html(data.amount);


                    $("#result_2,#hint_2,#result_3").show();

                    $("#wx_redbag_draw").removeClass("hide").attr("href", data.url);


                } else if (code == "1") { //领取红包金额已达上限
                    $("#promot_1,#wx_input,#wx_btn_submit").hide();
                    $("#result_1").show().css("marginTop", "32px");
                    if (data.url) {
                        $("#wx_redbag_draw").removeClass("hide").attr("href", data.url);
                    }


                } else if (code == "2") { //已领过 不能重复领
                    $("#promot_1,#wx_input,#wx_btn_submit").hide();
                    $("#result_8").show().css("marginTop", "32px");
                    if (data.url) {
                        $("#wx_redbag_draw").removeClass("hide").attr("href", data.url);
                    }


                } else if (code == "3") { //红包已经被领完了
                    $("#promot_1,#wx_input,#wx_btn_submit").hide();
                    $("#result_4").show().css("marginTop", "32px");
                } else if (code == "4") { //活动已经结束了
                    $("#promot_1,#wx_input,#wx_btn_submit").hide();
                    $("#result_5").show().css("marginTop", "32px");
                } else if (code == "5") { //红包链接已失效
                    $("#promot_1,#wx_input,#wx_btn_submit").hide();
                    $("#result_6").show().css("marginTop", "32px");
                }

                if (data.myBonusShareUrl) { //我的红包  我也要发
                    $("#wx_redbag_share").html("让子弹飞");
                    $("#wx_btn_share").removeClass("hide").data("href", data.myBonusShareUrl);
                }
            },
            error: function(xhr, err) {
                //wxInputTip.html("系统繁忙，请稍后再试！").show();
                $this.html("拆开红包").removeClass("wx_stage_btn_disabled");
            }
        });
    });
    /*检测手机号码*/
    function checkPhone(phone) {
        var result = true;
        var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
        if (!phoneReg.test(phone)) {
            result = false;
        }
        //console.log("check phone",phone,result);
        return result;
    }
});


$(function(result) {
	var data = {
		timestamp: wxconf.timestamp,
		nonceStr: wxconf.noncestr,
		signature: wxconf.sign,
	};

	//alert(data.timestamp);
	//alert(data.nonceStr);
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: 'wx4b6e962611f5e662', // 必填，公众号的唯一标识
		//appId:"wxa1d1ccd49006b0c5",//测试公众号
		timestamp: "" + data.timestamp, // 必填，生成签名的时间戳
		nonceStr: data.nonceStr, // 必填，生成签名的随机串
		signature: data.signature, // 必填，签名，见附录1
		jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "hideMenuItems", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
		if (/51blb\.com/.test(document.location.href)) {
			//alert("微信接口调用失败");
		}
	});


	function bindWeixinEvent(data) {
		//alert("shareURL:"+data.shareURL);
		//window.g_url = data.shareURL;
		if (typeof(g_stage) == "undefined") {
			g_stage = 0;
		}
		var title = "股民不哭,农发贷陪着你";
		var des = "如果你有炒股的朋友，最好多请他吃个饭，或者把农发贷推荐给他。股民朋友可以来领180元安慰红包。";
		var imgUrl = "http://www.51blb.com/stock/img/baymax_184.jpg";//
		var linkUrl = wxconf.shareUrl;//分享链接
		
		
		var wxuid=$("#weixin_uid").val();
		var source=$("#source").val();
		
		
		wx.onMenuShareTimeline({
			title: title + des, // 分享标题
			link: linkUrl, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
				//alert("分享成功");
				$.ajax({
					url: "/handler/weixin/shareSucc.json",
					data: {
						wxuid:wxuid,
						source:source,
						sharetype:"timeline"
					},
					type: "post",
					success: function(data) {

					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
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
				$.ajax({
					url: "/handler/weixin/shareSucc.json",
					data: {
						wxuid:wxuid,
						source:source,
						sharetype:"message"
					},
					type: "post",
					success: function(data) {

					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
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
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareWeibo({
			title: title, // 分享标题
			desc: des, // 分享描述
			link: linkUrl, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//alert("bindWeixinEvent succ");

	}
}
);

$(function() {
    var wx_mask = $("#wx_mask");
    var wx_mask_gz = $("#wx_mask_gz");
    var wx_mask_tip = $("#wx_mask_tip");
    /*分享弹出层*/

    $("#wx_btn_share").on("click", function() {
        if (true||navigator.appVersion.match(/MicroMessenger/i)) {
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