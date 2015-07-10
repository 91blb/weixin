require.config({
	baseUrl:"/js"
//	paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//	},
//	shim:{
//		"zepto":{
//           "exports": "Zepto"
//		},
//		"iscroll":{
//           "exports": "IScroll"
//		},
//	}
});
require(["mod/common"],function(common){
	
	function bindEvent(){
		$("#amount").on("input",investChange);
		$("#amount").on("blur",validateInvest);
		$("#amount").on("focus",hideErrorMsg);
		$("#confirm_invest").on("click",doSubmit);
	}
	
	
	function investChange(){
		var val=$("#amount").val();
		if(val){
			var chinesNum=chineseNumber(val-0);
			console.log("val=",val,"chineseNum=",chinesNum);
			$("#invest_chinese_num").html(chinesNum);/*投资金额中文*/
		}else{
			$("#invest_chinese_num").html('');/*投资金额中文*/
		}
		$("#invest_profit").html(getProfit(val));
		$("#invest_bonus").html(getBonusBack(val));
	}
	
	function getProfit(val){
		var result="";
		$("#yjsy").val('');
		if(val>0){
			var nsy = $("#nsy").val();
			var qx = $("#qx").val();
			var hkfs = $("#hkfs").val();
			console.log("amount:"+val+",nsy:"+nsy+",qx:"+qx+",hkfs:"+hkfs);
			var yjsy = beginJs(val,nsy,qx,hkfs);
			result=getWording("invest_01",yjsy);
			$("#yjsy_amount").val(yjsy>0?yjsy:0);
			//result="预期收益:<i>"+beginJs(val,nsy,qx,hkfs)+"</i>元";
		}
		else{
		}
		
		return result;
	}
	function getBonusBack(val){
		var result="";
		var fx_mount=$("#fx_mount");
		fx_mount.val('');
		var hongbao51 = $("#hongbao51").val();
		var hongbaonpxcj = $("#hongbaonpxcj").val();
		var hongbao515 = $("#hongbao515").val();
		var hongbao5151 = $("#hongbao5151").val();
		if(hongbao51||hongbao515 || hongbaonpxcj){
			if(val>0){
				var hbao51 = hongbao51?hongbao51.substring(0,hongbao51.lastIndexOf(",")).split(","):null;
				var hbaonpxcj = hongbaonpxcj?hongbaonpxcj.substring(0,hongbaonpxcj.lastIndexOf(",")).split(","):null;
				var hbao515 = hongbao515?hongbao515.substring(0,hongbao515.lastIndexOf(",")).split(","):null;
				var hbao5151 = hongbao5151?hongbao5151.substring(0,hongbao5151.lastIndexOf(",")).split(","):null;
				var hqhongbaotj51 = $("#hqhongbaotj51").val();
				var hqhongbaotjnpxcj = $("#hqhongbaotjnpxcj").val();
				var hqhongbaotj515 = $("#hqhongbaotj515").val();
				var hqhongbaotj5151 = $("#hqhongbaotj5151").val();
				var fd51 = hqhongbaotj51.split("#");
				var fdnpxcj = hqhongbaotjnpxcj.split("#");
				var fd515 = hqhongbaotj515.split("#");
				var fd5151 = hqhongbaotj5151.split("#");
				var g_myBonus51=[],g_myBonusnpxcj=[],g_myBonus515=[],g_myBonus5151=[];
				var index = 0,index_npx = 0,index_i = 0;
				var bonus = null;
				if(hbao51){
					for(var j=0;j<fd51.length;j++){
						var fdv = fd51[j].split("-");
						if(hbao51.indexOf(fdv[1])!=-1){
							g_myBonus51[index] = {invest:fdv[0],bonus:fdv[1]};
							index++;
						}
					}
					var obj;
					for(var i=0;i<g_myBonus51.length;i++){
						obj=g_myBonus51[i];
						if(parseFloat(val)>=parseFloat(obj.invest)){
							bonus=obj.bonus;
							break;
						}
					}
				}
				if(hbaonpxcj){
					for(var j=0;j<fdnpxcj.length;j++){
						var fdv = fdnpxcj[j].split("-");
						if(hbaonpxcj.indexOf(fdv[1])!=-1){
							g_myBonusnpxcj[index_npx] = {invest:fdv[0],bonus:fdv[1]};
							index_npx++;
						}
					}
					var obj;
					for(var i=0;i<g_myBonusnpxcj.length;i++){
						obj=g_myBonusnpxcj[i];
						if(parseFloat(val)>=parseFloat(obj.invest)){
							bonus = Math.max(obj.bonus,bonus);
							break;
						}
					}
				}
				if(hbao515){
					for(var h=0;h<fd515.length;h++){
						var fdv = fd515[h].split("-");
						if(hbao515.indexOf(fdv[1])!=-1){
							g_myBonus515[index_i] = {invest:fdv[0],bonus:fdv[1]};
							index_i++;
						}
					}
					var obj;
					for(var i=0;i<g_myBonus515.length;i++){
						obj=g_myBonus515[i];
						if(parseFloat(val)>=parseFloat(obj.invest)){
							bonus = Math.max(obj.bonus,bonus);
							break;
						}
					}
				}
				if(hbao5151){
					for(var h=0;h<fd5151.length;h++){
						var fdv = fd5151[h].split("-");
						if(hbao5151.indexOf(fdv[1])!=-1){
							g_myBonus5151[index_i] = {invest:fdv[0],bonus:fdv[1]};
							index_i++;
						}
					}
					var obj;
					for(var i=0;i<g_myBonus5151.length;i++){
						obj=g_myBonus5151[i];
						if(parseFloat(val)>=parseFloat(obj.invest)){
							bonus = Math.max(obj.bonus,bonus);
							break;
						}
					}
				}
				if(bonus){/*匹配上了红包*/
					result=getWording("invest_02",bonus);
					//result="投资返现:<i>"+bonus+"元</i>";
					fx_mount.val(bonus);
				}
			}
			else{
			}
		}
		return result;
	}
	
	
	function validateInvest(){
		var val=$("#amount").val()-0;/*进行校验*/
		var stepVal=$("#step_amount").val()-0;
		var minVal=$("#min_amount").val()-0;
		var maxVal=$("#availableAmount").val()-0;
		var myVal=$("#my_amount").val()-0;
		var novicebidquota = $("#novicebidquota").val();
		var bidType = $("#bidType").val();
		var isNewBiao = $("#isNewBiao").val();
		
		var validata_result=true;
		var errorMsg="";
		if(val<minVal){
			validata_result=false;
			errorMsg=getWording("invest_03",minVal);
			//errorMsg="投资金额不能小于"+minVal+"元";
		}
		if(stepVal&&parseFloat(val)!=parseFloat($("#ktje").val())){
			if(val%stepVal!=0){
				validata_result=false;
				//errorMsg=getWording("invest_04");
				errorMsg="投资金额须为"+stepVal+"整数倍";
			}
		}
		
		
		if(val>maxVal){
			validata_result=false;
			errorMsg=getWording("invest_05",maxVal);
			//errorMsg="投资金额不能大于"+maxVal+"元";
		}
		
		//新手标判断验证每笔投资金额
		if(isNewBiao==1){
			if(parseInt(val)>parseInt(novicebidquota)){
				validata_result=false;
				errorMsg=getWording("新手标投标金额不能大于"+novicebidquota);
			}
		}
		
		tip($("#invest_error_con"),validata_result,errorMsg);
		return validata_result;
	}
	
	function tip(dom,flag,errorMsg){
		errorMsg=errorMsg||getWording("invest_06");
		//errorMsg=errorMsg||"服务器错误，请稍后重试"
		console.log("show tip",dom,flag,errorMsg);
		var errorCon=dom;
		var errorDom=errorCon.children("p");
		console.log("errorDom",errorDom);
		if(flag){
			console.log("hide");
			errorCon.hide();/*隐藏错误提示信息*/
		}
		else{
			//console.log("show",errorDom[0]);
			//errorDom[0].innerHTML=errorMsg;
			$(errorDom).html(errorMsg);/*展示错误提示信息*/
			//console.log("show end");
			errorCon.show();/**/
		}
		console.log("where is the error");

	}
	
	function hideErrorMsg(){/*隐藏出错信息*/
		$("#invest_error_con").hide();
	}
	

	
	function doSubmit(){
		if(validateInvest()){
			submitForm();
		}
	}
	
	function submitForm(){
		$("#nfd-invest-form2").submit();	
	}
	
	function chineseNumber(num) {/*中文转换*/
		if (isNaN(num) || num > Math.pow(10, 12))
			return ""
		var cn = "零壹贰叁肆伍陆柒捌玖"
		var unit = new Array("拾百千", "分角")
		var unit1 = new Array("万亿", "")
		var numArray = num.toString().split(".")
		var start = new Array(numArray[0].length - 1, 2)
	
		function toChinese(num, index) {
			var num = num.replace(/\d/g, function($1) {
				return cn.charAt($1) + unit[index].charAt(start-- % 4 ? start % 4 : -1)
			})
			return num
		}
	
		for (var i = 0; i < numArray.length; i++) {
			var tmp = ""
			for (var j = 0; j * 4 < numArray[i].length; j++) {
				var strIndex = numArray[i].length - (j + 1) * 4
				var str = numArray[i].substring(strIndex, strIndex + 4)
				var start = i ? 2 : str.length - 1
				var tmp1 = toChinese(str, i)
				tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "")
				tmp1 = tmp1.replace(/^壹拾/, "拾")
				tmp = (tmp1 + unit1[i].charAt(j - 1)) + tmp
			}
			numArray[i] = tmp
		}
	
		numArray[1] = numArray[1] ? numArray[1] : ""
		numArray[0] = numArray[0] ? numArray[0] + "元" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "")
		numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1] + "整"
		return numArray[0] + numArray[1]
	}
	
	
	function init(){
		common.init();
		bindEvent();
	}
	init();/*首页模块初始化*/
});


