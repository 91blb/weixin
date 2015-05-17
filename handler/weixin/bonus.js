module.exports=function(req,res,opt){
	var a=req.query.a||0;
	var b=req.query.b||0;
	
	console.log("bonus query param:",req.query);
	//console.log(req.query);
	//console.log("opt",opt);
	
	var path=require("path");
	//return req.query;
	res.sendFile("bonus.html",{ root: path.join(opt.basePath, '/web/src/') });
}