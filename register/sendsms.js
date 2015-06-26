var request=require("request");
var url="http://m.nongfadai.com/regist/send.htm";
var phone=13652447386;
var opt={
	url:url,
	uri:url,
	method:"POST",
	body:"phone="+phone+"&type=band"
}

request(opt,function(err,res,body){
	console.log("res:",res);
	console.log("body:",body);
})