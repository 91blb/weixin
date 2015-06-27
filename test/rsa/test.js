var NodeRSA = require('node-rsa');
var fs=require("fs-extra");
var path=require("path");
var key = new NodeRSA();
key.generateKeyPair();
var result1=key.exportKey("private");
var result2=key.exportKey("public");
fs.writeFileSync(path.resolve(__dirname,"pub.key"),result1);
fs.writeFileSync(path.resolve(__dirname,"pri.key"),result2);
//console.log(key);

console.log(result1);

console.log(result2);