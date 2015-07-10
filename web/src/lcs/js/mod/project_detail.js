require.config({
	baseUrl:"/js"
//		paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//		},
//		shim:{
//		"zepto":{
//		"exports": "Zepto"
//		},
//		"iscroll":{
//		"exports": "IScroll"
//		},
//		}
});


require(["mod/common"],function(common){
	function makeTab(controlDom,targetDom){
		controlDom.on("click",tabClick);
		
		function tabClick(e){
			//alert("click");
			var target=$(e.target).closest("a");
			
			console.log(target);
			if(target.hasClass("selected")){
				console.log("haveClass");
			}
			else{/**/
				controlDom.find(".selected").removeClass("selected");
				targetDom.find(".selected").removeClass("selected");
				
				target.addClass("selected");
				targetDom.find("."+target.attr("data-tab")).addClass("selected");
			}
		}
		
	}
	
	function toggoleEllipse(){
		var con=$(this).parent(".text_con");
		con.toggleClass("ellipse");
	}

	function init(){
		common.init();
		makeTab($("#my_tab"),$("#my_tab_content"));
		$(".text_anchor").click(toggoleEllipse);
	}
	init();/*首页模块初始化*/
});
