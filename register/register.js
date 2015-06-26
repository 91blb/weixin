var request=require("request");
var url="http://m.nongfadai.com/pay/register.htm";
var phone=13042091152;
var code=8692;
var opt={
	url:url,
	uri:url,
	method:"POST",
	body:"phone="+phone+"&password=e10adc3949ba59abbe56e057f20f883e&code="+code+"&inviteCode=i84ryj&promotionChannel=TGM"
}

request(opt,function(err,res,body){
	console.log("res:",res);
	console.log("body:",body);
})