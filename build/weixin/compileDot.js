// JavaScript Document

var dot=require("./micro_tpl");

var fs=require("fs");
var encoding={encoding:"utf8"};

var tplStr=fs.readFileSync("../../src/weixin/tpl/wx_list_axn.tpl",encoding);
//console.log(dot);

var tpl=dot(tplStr);


//console.log(tpl);

var fn=new Function("it","opt",tpl);
//console.log(fn);
var json=fs.readFileSync("../../src/weixin/data/list_axn.txt",encoding);
//console.log(json);
var result=fn(JSON.parse(json),{formatCountDown:function(){},formatProgress:function(){}});

console.log("result",result);

