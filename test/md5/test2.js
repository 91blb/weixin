var NodeRSA = require('node-rsa');
var fs=require("fs-extra");
var path=require("path");
var key = new NodeRSA();
var key2 = new NodeRSA();
var encoding={encoding:"utf8"};
var str1=fs.readFileSync(path.resolve(__dirname,"pri.key"),encoding);
var str2=fs.readFileSync(path.resolve(__dirname,"pub.key"),encoding);
//console.log(key);

key.importKey(str1, "private");
//key.importKey(str2, "public");
console.log("isPrivate",key.isPrivate());
key2.importKey(str2, "public");

var str="123456"

var signStr=key.sign(str,"base64");
console.log("signStr",signStr);
//console.log(str1);
var verifyResult=key2.verify(str, signStr,"utf8","base64");
console.log("verifyResult",verifyResult);
//console.log(str2);