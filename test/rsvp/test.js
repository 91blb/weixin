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
a_p(1).then(function(result){
    console.log("result",result);
});

b_p(1).then(function(result){
    console.log("result",result);
})

