console.log("自定义任务cssmin");
module.exports = function(grunt) {
	
  grunt.registerTask('test_cssmin', 'A sample task that just test cssmin.', function(arg1, arg2) {
		grunt.config.set("cssmin",{

			  combine: {
			  	cwd:"build_demo/dist/css/",
				files: {
				  'build_demo/dist/css/aio.css': ['*.css']
				}
			  }
			});
		
		grunt.task.run("cssmin");
		//console.log("test copy set config");
	});
	
	//grunt.registerTask("my_copy",["test_copy","copy"]);

};