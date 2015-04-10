var grunt = require("grunt");

var css=['common.css', "layout.css", "a*.css", '!aio*.css',"header_style.css", "banner.css", "footer_style.css", "tips_style.css", "kefu.css","product_icon.css"];
var js=["axn.js","banner.js","header_init.js","rightTipsInit.js","index.js"];


grunt.registerTask('test_cssmin2', 'A sample task that just test cssmin.', function(arg1, arg2) {
	//grunt.file.setBase("build_demo/src/css/");
	//grunt.file.setBase("E:/project/new_workspace/xnol-portal-web/src/main/webapp/resources/project/portal/css/");
	grunt.file.setBase("E:/project/xn_web/WebHtml/project/portal/css/");
	grunt.config.set("cssmin", {
		combine: {
			files: {
				'aio.css': css
			}
		}
	});

	grunt.task.run("cssmin");
	//console.log("test copy set config");
});

grunt.registerTask('test_concat', 'A sample task that just test cssmin.', function(arg1, arg2) {
	//grunt.file.setBase("build_demo/src/css/");
	grunt.file.setBase("E:/project/new_workspace/xnol-portal-web/src/main/webapp/resources/project/portal/css/");
	grunt.config.set("concat", {
		combine: {
			src:css,
			dest:'aio.css'
		}
	});

	grunt.task.run("cssmin");
	//console.log("test copy set config");
});

grunt.registerTask('test_jsmin', 'A sample task that just test uglifyjs.', function(arg1, arg2) {
	//grunt.file.setBase("build_demo/src/css/");
	grunt.file.setBase("WebHtml/project/portal/js/");
	grunt.config.set("uglify", {
		my_target: {
			files: {
				'aio.js': js
			}
		}
		
	});

	grunt.task.run("uglify");
	//console.log("test copy set config");
});

grunt.registerTask('test_concat2', 'A sample task that just test concat.', function(arg1, arg2) {
	grunt.file.setBase("E:/project/new_workspace/xnol-portal-web/src/main/webapp/resources/project/portal/css/");
	//grunt.file.setBase("E:/project/xn_web/WebHtml/project/portal/css/");

	grunt.config.set("concat", {
		css: {
			src: css,
			dest: 'aio.css',
		}
	});

	grunt.task.run("concat:css");


	var file=grunt.file.read("aio.css");
	var MD5=require("MD5");
	var suffix=MD5(file);
	var str=suffix.substr(0,6);
	console.log(str);

	grunt.file.write("aio."+str+".css",file);
	//console.log("test copy set config");
});

grunt.registerTask('test_concat3', 'A sample task that just test concat.', function(arg1, arg2) {
	grunt.file.setBase("E:/project/new_workspace/xnol-portal-web/src/main/webapp/resources/project/portal/js/");

	grunt.config.set("concat", {
		js: {
			src: js,
			dest: 'aio.js',
		}
	});

	grunt.task.run("concat:js");

	var file=grunt.file.read("aio.js");
	var MD5=require("MD5");
	var suffix=MD5(file);
	var str=suffix.substr(0,6);
	console.log(str);

	grunt.file.write("aio."+str+".js",file);
	//console.log("test copy set config");
});



var myTask=[
			//"test_cssmin2",
			"test_concat2",//首页css合并
			//"test_concat3",//首页js合并
			//"test_jsmin"
		];
grunt.tasks(myTask, function() {
	console.log("myTask done");
});