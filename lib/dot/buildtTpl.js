var dot=require("dot");
var path=require("path");
var fs=require("fs-extra");
var encoding={encoding:"utf8"};

//console.log(dot);


function build(tplFile,data,opt){
	var baseDir=opt&&opt.baseDir||__dirname;

	var filePath=path.resolve(baseDir,tplFile);

	var fileContent=fs.readFileSync(filePath,encoding);

	console.log("length",fileContent.length);
	
}


build("a.html",{name:"11"})