var fs = require("fs");
var doT = require("dot");
var encoding = {
	encoding: "utf8"
};
var Beautify = require("node-js-beautify");
var beautify=new Beautify();


function test() {
	replaceJSP("a.jsp");
}

function replaceJSP(file){
	var file=fs.readFileSync(file,encoding);
	file=replaceJSPCmd(file);
	file=replaceIfElse(file);
	file=replaceIf(file);

	file=removeChoose(file);
	file=replaceVar(file);

	fs.writeFileSync("./tpl/a.tpl",file,encoding);

	compile("a", "./data/a.js")

}

function replaceJSPCmd(str){
	str=str.replace(/<%@[^>]*?>[\s]*/g,function(a,b,c){
		console.log("a",a,b);
		return ""
	})
	return str;
}

function replaceIf(str){
	console.log("replace if");
	//<c:if test="${msgNumber > 0 || bonusUnusedNumber > 0}">
	str=str.replace(/<c:if test="\$\{([^}]*)?\}">/g,function(a,b,c){
		console.log("a",a,b);
		b=b.replace(/not empty[ ]*/g,"null != it.");
		//b=b.replace(/not empty[ ]*/g,"null != it.")
		b=b.replace(/\|\|[ ]*/g,"||it.");
		b=b.replace(/&&[ ]*/g,"&&it.");
		return "<%if(it."+b+"){%>"
	})

	str=str.replace(/<\/c:if>/g,function(a,b,c){
		console.log("a",a,b);
		return "<%}%>"
	})
	return str;
}
function removeChoose(str){
	str=str.replace(/<c:choose>/g,function(a,b,c){
		return ""
	})
	str=str.replace(/<\/c:choose>/g,function(a,b,c){
		return ""
	})
	return str;
}

function replaceIfElse(str){
	console.log("replace if else");
	//\$\{([.]*)?\}">
	str=str.replace(/<c:when test="\$\{([^}]*)?\}">/g,function(a,b,c){
		console.log("a",a,b);
		b=b.replace(/not empty[ ]*/g,"null != it.")
		return "<%if("+b+"){%>"
	})

	str=str.replace(/<\/c:when>/g,function(a,b,c){
		console.log("a",a,b);
		return "<%}%>"
	})
	str=str.replace(/<c:otherwise>/g,function(a,b,c){
		console.log("a",a,b);
		return "<%else{%>"
	})
	str=str.replace(/<\/c:otherwise>/g,function(a,b,c){
		console.log("a",a,b);
		return "<%}%>"
	})
	return str;
}

function replaceVar(str){
	console.log("replace var");
	str=str.replace(/\$\{([^}]*)?\}/g,function(a,b,c){
		console.log("a",a,b);
		return "<%=it."+b+"%>"
	})

	return str;
}


function compile(fileName, dataFnPath) {
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