(function() {
	var grunt = require("grunt");
	var stripJson = require("strip-json-comments");
	var jsBeautify = require('js-beautify');

	console.log(jsBeautify);


	grunt.registerTask('test_build_safety', 'test build safety', function(arg1, arg2) {
		var baseDir = "WebHtml/project/account/safety/js/";
		grunt.file.setBase(baseDir);

		var mainFile = grunt.file.read("main.js");
		//console.log("mainFile",mainFile);
		var confReg = /seajs\.config\(([^\)]*)?\)/g
		var confRegResult = confReg.exec(mainFile);

		//console.log(confRegResult);
		//var aliasReg=/alias\:(\{[^\}]*?\})/g;
		//var aliasRegResult=aliasReg.exec(confRegResult[1]);
		//var aliasConf=JSON.parse(stripJson(confRegResult[1]));
		var conf = eval("(" + confRegResult[1] + ")");
		var aliasConf = conf.alias;
		//console.log(aliasConf);

		var currFolderRes = [];
		for (var p in aliasConf) {
			//console.log(p,aliasConf[p]);
			if (aliasConf[p].match(/\//g).length == 1) { //只出现一次
				currFolderRes.push(p);
				delete aliasConf[p];
			}
		}
		var newSeajsConf = confRegResult[0].replace(confRegResult[1], jsBeautify.js(JSON.stringify(conf)));
		//console.log(confRegResult[0]);
		//console.log(newSeajsConf);

		//console.log(currFolderRes);
		var mergedMod = mergeFiles(currFolderRes);
		var mainFile2 = mainFile.replace(confRegResult[0], newSeajsConf + "\r\n\/**模块123213213合入**\/\r\n" + mergedMod);
		grunt.file.write("init.js", mainFile2);
	});

	function mergeFiles(currFolderRes) {
		var str = "";
		for (var i = 0; i < currFolderRes.length; i++) {
			var fileName = currFolderRes[i];
			var file = grunt.file.read(currFolderRes[i] + ".js");
			console.log(fileName, file.length);
			var file2 = file.replace(/define\(/, 'define("' + fileName + '",');
			console.log(file2.substr(50, 50));

			str += file2;
			str += "\r\n\r\n";
		}
		return str;
	}



	var myTask = [
		//"test_cssmin2",
		"test_build_safety",
		//"test_concat3",
		//"test_jsmin"
	];
	grunt.tasks(myTask, function() {
		console.log("myTask done");
	});
})();