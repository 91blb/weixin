var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');
var favicon = require('serve-favicon');
 
app.use(favicon(__dirname + '/src/app/favicon.ico'));

var colors = require('colors');
process.on('uncaughtException', function(e) {
  console.log("server on error");　　
  console.log(e);
});


app.use(session({
  name:'token',
  secret: 'secret.91blb.com',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  },
  debug:true
}));
app.use(cookieParser());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, {
      error: 'Something blew up!'
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err
  });
}

app.all('*', function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Cookie");
  //res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //res.header("Access-Control-Request-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Cookie");
  //res.header('Set-Cookie','myCookie=test');
  res.header('Cache-Control', 'no-cache');
  //console.log("node receive reqest " + req.path);
  var fs = require("fs");
  var encoding = {
    encoding: "utf8"
  };

  if (req.method == "OPTIONS") res.send(200); /*让options快速返回*/
  if (/\.(js|css|txt|json|html|png|jpeg|jpg|gif|tpl|ico|woff)/ig.test(req.path)) {
    //如果是文件名
    next();
    console.log("is File");
  }
  else{
    next();
  }
});

function getBodyStr(obj) {
  var str = "";
  var i = 0;
  for (var p in obj) {
    if (i > 0) {
      str += "&";
    }
    str += p + "=" + obj[p];
    i = 1;
  }
  return str;
}

var request = require("request");
var fs = require("fs-extra");

function handler(req, res) { //处理所有服务请求
  console.log("handler is doing his job!");
  var sess = req.session;
  console.log("session",sess);

  if (sess&&sess.views) {
    sess.views++
    res.setHeader('views', sess.views);
    //res.write('<p>views: ' + sess.views + '</p>')
    //res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    //res.end()
  } else {
    if(req.path.indexOf("login")>-1){//登录动作才设置session
      sess.views = 1
      res.setHeader('views', sess.views);
    }
    //res.end('welcome to the session demo. refresh!')
  }

  try {
    var method = req.path.replace(/^.*?\/data/g, "");
    method = method.replace(/\.(js|txt|json).*$/, ""); //忽略后面的任意参数  捕获rest请求

    console.log(("method=" + method).green);

    var fn = require("./handler/" + method + ".js");
    var result = fn(req, res); //也允许异步返回
    //console.log("result=["+result+"]");
  } catch (e) {
    console.log(e);
    var result = {
      ec: 501
    };
  }

  if (result) res.send(result); //直接返回结果
}



app.use("/handler/", handler); //服务处理程序 handler
app.use("/src/", express.static(__dirname + "/src/")); //静态资源web



var port = 80;
var host = "127.0.0.1";
var host = "0.0.0.0";

console.log("app listen host=[" + host + "] on port=[" + port + "]");
app.listen(port, host);


/*自动化监视代码 并更新缓存*/
var watch = require('watch')

watch.watchTree(__dirname + "/lib/", handlerChange); //handler文件发生变化清除改项缓存
watch.watchTree(__dirname + "/handler/", handlerChange); //handler文件发生变化清除改项缓存

function handlerChange(f, curr, prev) { //服务变化
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
    // var rs=require(f);
  } else if (curr.nlink === 0) {
    console.log("handler file delete " + f);
    delete require.cache[f]; //删除

  } else {
    console.log("handler file change " + f);
    delete require.cache[f];
    //var rs = require(f); //重新加载改资源  确保下次使用能快速
    //console.log(rs.toString());
  }
}