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

var cachedAccessToken = {};
var cachedJSTicket = {};
//console.log("RSVP",RSVP);

function getURL(url) {
    var promise = new RSVP.Promise(function(resolve, reject) {
        // succeed 
        var request = require("request");
        request(url, function(err, res, body) {
            if (err) reject(err);
            else resolve(body);
        })
        // or reject 
    });
    return promise;
}

function getAccessToken() {
    console.log("getAccessToken");
    //console.log("timestamp", timeStamp);
    //if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
    url += "&appid=" + app_id;
    url += "&secret=" + app_secret;

    return getURL(url);
}

function getJSTicket(result) {
    //需要accesstoken 才能拉到 jsticket
    console.log("get js ticket");
    var timestamp = parseInt(now.getTime() / 1000); /*秒数*/



    var promise = new RSVP.Promise(function(resolve, reject) {
        if (cachedAccessToken) {
            console.log("cachedAccessToken", cachedAccessToken);
            if (cachedAccessToken && cachedAccessToken.timestamp + 7200 > timestamp) { /*还没失效*/
                if (cachedJSTicket) { //如果ticket也存在
                    resolve(cachedJSTicket);
                    return; //直接返回
                }
            }
        }


        getAccessToken().then(function(result) {
            console.log("getAccessToken result:", result);
            var data = JSON.parse(result);
            data.timstamp = timestamp;
            cachedAccessToken = data;

            var access_token = data.access_token;
            var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi";
            url += "&access_token=" + access_token;
            getURL(url).then(resolve);
        })
    });

    return promise;
}

function gensignature(url) {
    console.log("gensignature");
    var timestamp = parseInt(now.getTime() / 1000); /*秒数*/

    var dealData = function(result) {
        //console.log("deal data", result);
        var arr = ["jsapi_ticket", "timestamp", "noncestr", "url"];
        //var data = {};
        //data.jsapi_ticket = 'sM4AOVdWfPE4DxkXGEs8VLWjJZoEBEvx2NWUFvnUOytEJtjH-EF8ssBvzBJOn2SyX_cloDyB-QXw-zfljJoprg'
        //var api_ticket="E0o2-at6NcC2OsJiQTlwlJfajP7HsS98gcJSBUdYmmTpx1sgpRLCWgM2M9kISeJ_PoSsgCmFwk8UprE2FF7jRA";
        var data = {};
        data.jsapi_ticket = result.ticket;
        data.noncestr = "randomstr123QQ";
        data.timestamp = "1434115401";
        data.url = url || "http://m.nongfadai.com/npx.html?from=singlemessage&isappinstalled=0";

        //var sign = "8f3fa3a1994b2df4e163b7aaa475a9f3aa42dce8";


        arr = arr.sort();
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                str += "&";
            }
            var key = arr[i];
            str += key;
            str += "=";
            str += data[key];
        }

        //console.log(str);

        var sign = sha1(str);
        //console.log("sign", sign);
        data.sign = sign;

        return data;
    }

    var promise = new RSVP.Promise(function(resolve, reject) {
        if (cachedJSTicket) {
            console.log("cachedJSTicket", cachedJSTicket);
            if (cachedJSTicket && cachedJSTicket.timestamp + 7200 > timestamp) { /*还没失效*/
                var signedResult = dealData(cachedJSTicket);
                console.log("signedResult", signedResult);
                resolve(signedResult);
            }
        }


        getJSTicket().then(function(result) {
            console.log("getJSTicket result:", result);

            var data = JSON.parse(result);
            data.timestamp = timestamp;
            cachedJSTicket = data;

            var signedResult = dealData(data);

            console.log("signedResult", signedResult);
            resolve(signedResult);
        })
    });

    return promise;

    //arr.push(api_ticket);
    //timestamp、card_id、code、openid、balance
}
//module.exports=getAccessToken;
//getAccessToken();
//main();

gensignature().then(function(result) {
    console.log("result", result);
});

//gensignature();