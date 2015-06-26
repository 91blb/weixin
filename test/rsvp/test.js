var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
    encoding: "utf8"
};
var url = "";
var app_id = "wx4b6e962611f5e662";
var app_secret = "78f0744a1d73bbbd423859840fd1255d";

var sha1 = require("sha1");

var RSVP = require('rsvp');
//console.log("RSVP",RSVP);
function a_p(args){
    var promise = new RSVP.Promise(function(resolve, reject) {
        // succeed 
        //console.log("in excute");
        var random=Math.random();
        //console.log("random",random);
        if(args>0.5){
            resolve(1);
        }
        else{
            resolve(2);
        }
        // or reject 
    });

    return promise;
}

function b_p(args){
    var promise = new RSVP.Promise(function(resolve, reject) {
        a_p(args).then(function(result){
            var num=result*10;
            resolve(num);
        })
    });
    return promise;
}
// var x1=a_p(1);
// var x2=x1.then(function(){
//     return b_p;
// });
// console.log("x2",x2);
// x2.then(function(result){
//     console.log("x2 result",result);
// })
a_p(1).then(function(result){
    console.log("a result",result);
    return b_p(1);
}).then(function(result){
    console.log("b result",result);
})

