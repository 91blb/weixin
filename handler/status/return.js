module.exports = function(req, res, cb) { //微信校验
	//res.status(500);
	var code=404;
	console.log("send "+code);
	//res.sendStatus(404);
	//res.status(404).end();
	res.status(code).end();
}

