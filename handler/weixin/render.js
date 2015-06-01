var fs=require("fs-extra");
var path=require("path");

module.exports=function(req,res,opt){
	var data=fs.readJsonSync(path.resolve(__dirname,"../../data/userinfo/millerliu.json"));
	data.headimgurl=data.headimgurl.replace(/\\/g,"");
	console.log(data);
	res.render("bonus.vm",data);
}