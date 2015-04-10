var grunt = require("grunt");

var css=['nba_layout.css', "5list.css"];
var js=["axn.js","banner.js","header_init.js","rightTipsInit.js","index.js"];

var baseDir="E:/project/new_workspace/xnol-portal-web/src/main/webapp/resources/project/portal/activity/nba2/css/";
grunt.registerTask('test_cssmin2', 'A sample task that just test cssmin.', function(arg1, arg2) {
	//grunt.file.setBase("build_demo/src/css/");
	grunt.file.setBase(baseDir);
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
	grunt.file.setBase("WebHtml/project/portal/css/");

	grunt.config.set("concat", {
		css: {
			src: css,
			dest: 'aio.css',
		}
	});

	grunt.task.run("concat:css");
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
	//console.log("test copy set config");
});



var myTask=[
			"test_cssmin2",
			//"test_concat2",
			//"test_concat3",
			//"test_jsmin"
		];
grunt.tasks(myTask, function() {
	console.log("myTask done");
});