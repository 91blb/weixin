$(function(){
	var $container = $("#container");
	var mask = $("#wx_mask");
	var maskTip = $("#wx_mask_tip");
	var wxInput=$("#wx_input");
	var wxInputTip = $("#wxInputTip");
	var submitBtn = $("#wx_btn_submit");
	console.log(submitBtn);
	
	var mobile = $("#mobile");
	var wxRedbagTip = $("#wxRedbagTip");
	
	  
	/*maskTip.show();*/
	$("#wxRuleHandler").on("click",function(){
		mask.show();
	});
	$(".wx_btn_iknow,.wx_share_close").on("click",function(){
		maskTip.hide();
		mask.hide();
	});
	//禁用弹出层touchmove
	function disabledTouchMove(obj){
		obj.addEventListener('touchmove', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});				
	}
	/**/
	mobile.on("focus",function(){
		wxInputTip.hide();
	}).on("keyup",function(){
		console.log("keydown");
		wxInput.removeClass("wx_input_error");
		wxInputTip.hide();
		if(checkPhone($(this).val())){
			submitBtn.removeClass("wx_redbag_btn_disable");
		} else {
			submitBtn.addClass("wx_redbag_btn_disable");
		}
	});
	mobile.on("input",function(){
		//alert("change");
		//console.log("input");
		wxInput.removeClass("wx_input_error");
		wxInputTip.hide();
		if(checkPhone($(this).val())){
			submitBtn.removeClass("wx_redbag_btn_disable");
		} else {
			submitBtn.addClass("wx_redbag_btn_disable");
		}
	})
	
	
	if(!navigator.appVersion.match(/MicroMessenger/i)){
		//$(".wx_stage_info2,.wx_stage_money_con").hide();
		//$("#wxRedbagForm").html('<div style="text-align:center;margin-top:42px;margin-bottom:60px;font-size:14px; color:#353434;">请关注小牛在线微信公众号 xiaoniuzaixian<br>复制链接到微信中打开即可领取红包<br></div>');
       //return;
    }
	
	
	/*拆开红包按钮的提交事件 */
	submitBtn.on("click",function(){
		var $this = $(this);
		if($this.hasClass("wx_redbag_btn_disable")){//如果手机号是非法手机号
			mobile.focus();
			if(mobile.val()!==""){
				if(!checkPhone(mobile.val())){
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
		/*param["amount"] = "";*/
		$.ajax({
			url:"/weixin/bonus/receive.json",
			beforeSend: function(){
				$this.html("正在拆开红包...").addClass("wx_stage_btn_disabled");
			},
			data:param,
			type:"post",
			dataType:"json",
			success: function(data){
				var code=data.code;
				mobile.val("");
				if(code=="0"){
					/*成功*/
					$("#hint_1,#promot_1,#wx_input,#wx_btn_submit").hide();

					$("#result_2").html("￥"+data.amount);
					$("#wx_hint_money").html(data.amount);
					
					
					$("#result_2,#hint_2,#result_3").show();
					
					$("#wx_redbag_draw").removeClass("hide").attr("href",data.url);
					
					
				}  else if(code=="1"){//领取红包金额已达上限
					$("#promot_1,#wx_input,#wx_btn_submit").hide();
					$("#result_1").show().css("marginTop","32px");
					if(data.url){
						$("#wx_redbag_draw").removeClass("hide").attr("href",data.url);
					}
					
					
				}  else if(code=="2"){//已领过 不能重复领
					$("#promot_1,#wx_input,#wx_btn_submit").hide();
					$("#result_8").show().css("marginTop","32px");
					if(data.url){
						$("#wx_redbag_draw").removeClass("hide").attr("href",data.url);
					}
					
					
				} else if(code=="3"){//红包已经被领完了
					$("#promot_1,#wx_input,#wx_btn_submit").hide();
					$("#result_4").show().css("marginTop","32px");
				}
				 else if(code=="4"){//活动已经结束了
					$("#promot_1,#wx_input,#wx_btn_submit").hide();
					$("#result_5").show().css("marginTop","32px");
				}
				 else if(code=="5"){//红包链接已失效
					$("#promot_1,#wx_input,#wx_btn_submit").hide();
					$("#result_6").show().css("marginTop","32px");
				}
				
				
				if(data.totalRecievedAmt){/*领取红包总额*/
					$("#result_7_amt").html(data.totalRecievedAmt);
					$("#result_7").show();

				}
				if(data.myBonusShareUrl){//我的红包  我也要发
					$("#wx_redbag_share").html("我也要发<i class='myBonusAmt'>(可发红包"+data.myBonusAmt+"元)</i>");
					$("#wx_redbag_share").removeClass("hide").attr("href",data.myBonusShareUrl);
				}
				
				var box=$("#wx_stage_box")[0];
				var fullHeight=(box.scrollHeight);
				//alert("box"+fullHeight+"-"+box.clientHeight);
				if(fullHeight>box.clientHeight){
					$("#wx_stage_con").height(fullHeight+6);
				}
			},
			error:function(xhr,err){
				//wxInputTip.html("系统繁忙，请稍后再试！").show();
				$this.html("拆开红包").removeClass("wx_stage_btn_disabled");
			}
		});
	});
	/*检测手机号码*/
	function checkPhone(phone){
		var result=true;
		var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
		if(!phoneReg.test(phone)){
			result= false;	
		}
		//console.log("check phone",phone,result);
		return result;
	}
});