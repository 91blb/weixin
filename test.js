var express = require('express');
var app = express();
var vm = require('express-velocity');
var path=require("path");
var assert=require('assert');


app.engine(".vm", vm({
  root: __dirname + "/src/view"  //duplicated with views setting but required for velocity template
}))
app.set("views", __dirname + "/src/view")

app.render("index.vm", {name:"liudongjie"},function( err, content ){
 // assert(content === '<body>hello</body>')
 	console.log(err);
 	console.log(content);
})
