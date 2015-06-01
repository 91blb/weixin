var fs = require("fs");
var doT = require("dot");
var encoding = {
	encoding: "utf8"
};
var Beautify = require("node-js-beautify");
var beautify=new Beautify();


function test() {
	//compile("test1", "./data/a.js");
	compile("a", "./data/a.js")
}

function compile(fileName, dataFnPath,baseDir) {
	baseDir=
	var dataFn = require(dataFnPath);
	var data = dataFn();
	var snippet = fs.readFileSync("./tpl/" + fileName + ".tpl", encoding);

	doT.templateSettings = {
		evaluate: /\<\%([\s\S]+?)\%\>/g,
		interpolate: /\<\%=([\s\S]+?)\%\>/g,
		varname: 'it',
		strip: true
	};



	var doTCompiled = doT.template(snippet);
	var render = doTCompiled(data);
	render=beautify.beautify_html(render,{});
	fs.writeFileSync("./render/" + fileName + ".html", render, encoding);
	//console.log("Generated function: \n" + doTCompiled.toString());
	//console.log("Result of calling with " + JSON.stringify(data) + " :\n" + doTCompiled(data));
	//var jsp = fs.readFileSync(jspFile);
}


test();