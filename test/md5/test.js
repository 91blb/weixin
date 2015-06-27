var MD5=require("md5");
var NodeRSA = require('node-rsa');
var fs=require("fs-extra");
var path=require("path");
var key = new NodeRSA();
var key2 = new NodeRSA();
var encoding={encoding:"utf8"};
var str1=fs.readFileSync(path.resolve(__dirname,"pub.key"),encoding);
var str2=fs.readFileSync(path.resolve(__dirname,"pri.key"),encoding);
key.importKey(str1, "private");
key2.importKey(str2, "public");

//console.log(key);
//console.log("MD5",MD5);
var randomStr1="ltx0ttep-mznkc9d2-l24yz89u-nzffswns";
var randomStr2="hvn5v7l9-crvl2b20-myzmdsgq-cvyfsd61";
var max=2500;
for(var i=1;i<=max;i++){
	var str=randomStr1+i+randomStr2;
	var md5Str=MD5(str);
	//console.log("source:",md5Str,md5Str.substr(4,8));

	var signStr=key.sign(md5Str,"base64");
	//console.log("signStr",signStr);

	//console.log(str1);
	var verifyResult=key2.verify(md5Str, signStr,"utf8","base64");
	//console.log("verifyResult",verifyResult);

	var md5Str2=MD5(signStr);
	//console.log("output:",md5Str2,md5Str2.substr(0,8));

	console.log(md5Str,signStr,md5Str2.substr(0,8));
}

