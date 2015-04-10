var msgs=[];
function Log(){
	for(var i=0;i<arguments.length;i++){
		msgs.push(arguments[i]);
	}
}
function printMsg(){
	for(var i=0;i<msgs.length;i++){
		console.log(msgs[i]);
	}

}
Log("自定义任务 myRev");
var target = ["src/index.html"];
var destFolder = "";

var shelljs = require("shelljs/global");
cd('../../');

var path = require("path");
var grunt = require("grunt");
var md5Lib = require("MD5"); //
var fs = require("fs");
var fsExtra = require("fs-extra");

var parsedFile = {}; //already parsed files  (use file path as key)
var revMap = {}; //resources md5 map   (use file path as key)
var resources = [];
var resources2 = [];
var refs = [];
var baseDir = path.resolve(__dirname, "../../");
//Log("baseDir", baseDir);


process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});


function logObj(obj) {
	var arr = [];
	for (var p in obj) {
		arr.push(p);
	}
	console.log(arr.sort());
}

function main() {
	start();
		console.log("msg");

	printMsg();
}

function start() {
	var files = grunt.file.expand(target);
	Log("files", files);
	for (var i = 0; i < files.length; i++) {
		collectResources(files[i], resources, refs);
		refs.push(files[i]);
	}
	//renameFiles(resources2);
}

function getMd5(file) {
	//Log("getMd5", file);
	file = file.replace(/\//g, "\\");
	if (revMap[file]) {
		return revMap[file];
	} else {
		try {
			var steam = fs.readFileSync(path.join(baseDir, file));
			var md5Str = md5Lib(steam); //直接對文件進行重命名
			return revMap[file] = md5Str;
		} catch (ex) {
			Log("getMd5 error", ex);
			return null;

		}
	}
}

function getMd52(file) {
	try {
		var steam = fs.readFileSync(file);
		var md5Str = md5Lib(steam); //直接對文件進行重命名
		return revMap[file] = md5Str;
	} catch (ex) {
		Log("getMd5 2 error", ex);
		return null;

	}
}


function renameFile(file, baseDirRel) {
	var filePath = path.join(baseDir, baseDirRel, file);
	//Log("fileAbs", filePath);

	var extName = path.extname(file);

	var md5Name = getMd52(filePath);
	if (md5Name) {
		md5Name = md5Name.substr(0, 4);
		var destPath = filePath.replace("/", "\\")
		destPath = destPath.replace("src\\", "dist\\")
		destPath = destPath.replace(extName, "." + md5Name + extName);
		
		//Log("destPath", destPath);

		fsExtra.copySync(filePath, destPath);
	}
}


function collectCss(file) {
	Log("collect css", file);
	var baseDir = path.dirname(file); //所在目录
	var extName=path.extname(file);
	var baseName=path.basename(file,extName);
	//console.log("baseDir", baseDir);
	var resources = [];
	var text = grunt.file.read(file);

	var md5Str = md5Lib(text);
	revMap[file.replace(/\\/g, "/")] = md5Str;

	var pattern1 = /url\(([^\)]*)?\)/ig;

	var matches1 = text.match(pattern1);

	//Log("find image in css file", file, matches1);

	if (matches1) {
		for (var i = 0; i < matches1.length; i++) {
			var resource = matches1[i];
			//Log("resource",resource);
			//Log("resources",resources);
			var resourcePath = resource.substr(4, resource.length - 5);


			//Log("push image",resourcePath);
			resources.push(resourcePath);

			var fullPath = path.join(baseDir, resourcePath);
			resources2.push(fullPath);
		}

		Log("replacePath", resources);
		text = replacePath(text, resources, baseDir); //更换资源文件

		var dest = file.replace("src\\", "dist\\").replace("src/", "dist/");

		var md5name = getMd5(fullPath);
		if (md5name) {
			md5name = md5name.substr(0, 4);
			var newName = baseName + "." + md5name + extName;
			Log("newName",newName);
			Log("file",file);

			if (md5name) {
				Log("newName",dest);
				dest=path.join(baseDir, newName);
				dest=dest.replace("src\\", "dist\\").replace("src/", "dist/");
				Log("dest file",dest);

			} else { //文件资源不存在
				Log("发现不存在的资源", resourcePath, fullPath);
			}
		}

		grunt.file.write(dest, text); //写文件
		Log("writeCss", dest, text);
	}


	//url(../img/404niu.png)
}


function replacePath(content, resources, baseDir) {
	for (var i = 0; i < resources.length; i++) {
		var resourcePath = resources[i];
		//Log("resource rename", resourcePath, baseDir);
		//renameFile(resourcePath, baseDir);

		var dirName = path.dirname(resourcePath);
		var extName = path.extname(resourcePath);

		var baseName = path.basename(resourcePath, extName);
		//Log("resourcePath", resourcePath);
		//Log("baseDir", baseDir);
		//Log("baseName", baseName);


		var fullPath = path.join(baseDir, resourcePath);

		var md5name = getMd5(fullPath);
		if (md5name) {
			md5name = md5name.substr(0, 4);
			var newName = baseName + "." + md5name + extName;
			//Log("newName",newName);

			if (md5name) {
				var resourceReplace = resourcePath.replace(resourcePath, path.join(dirName, newName));
				resourceReplace=resourceReplace.replace(/\\/g,"\/");
				//resourcePath=resourcePath.replace(/\//g,"\\");
				Log("!!!!resourceReplace",resourceReplace,resourcePath);

				var text = content.replace(resourcePath, resourceReplace);
				content=text;
			} else { //文件资源不存在
				Log("发现不存在的资源", resourcePath, fullPath);
			}
		}
	}
	Log("content length",content);
	return content;
}


function collectResources(file) { //搜集资源文件
	Log("collectResources", file);
	var baseDir = path.dirname(file); //所在目录

	var text = grunt.file.read(file);

	Log("text", text.length);

	var pattern1 = /<link[^>]*?>/ig;
	var matches1 = text.match(pattern1);

	Log("matches1", matches1);

	if (matches1) {
		for (var i = 0; i < matches1.length; i++) {
			var resource = matches1[i];
			var resourcePath = /href=['"](.*)?['"]/ig.exec(resource);
			if (resourcePath) {
				var fullPath = path.join(baseDir, resourcePath[1]);
				collectCss(fullPath);
				resources.push(resourcePath[1]);
			}
		}
	}

	var pattern2 = /<(img|script)[^>]*?>/ig;
	var matches2 = text.match(pattern2);
	Log("matches", matches2);
	if (matches2) {
		for (var i = 0; i < matches2.length; i++) {
			var resource = matches2[i];
			var resourcePath = /src="([^"]*)?"/ig.exec(resource);
			if (resourcePath) {
				var fullPath = path.join(baseDir, resourcePath[1]);
				resources.push(resourcePath[1]);
			}
		}
	}

	Log("resources",resources);
	text = replacePath(text, resources, baseDir); //更换资源引用路径为md5后缀


	//Log("resources",resources);
	var dest = file.replace("src\\", "dist\\").replace("src/", "dist/");

	grunt.file.write(dest, text); //写入内容
}


main();