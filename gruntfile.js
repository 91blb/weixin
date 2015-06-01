process.on('uncaughtException', function(e) {
    console.log("server on error");　　
    console.log(e);
});


module.exports = function(grunt) {
	var base="D:/code/dev/h5nfd/front/src/main/webapp/css/";

	var conf_concat={
            css: {
                files: {
                }
            }
        };
	conf_concat.css.files[base+'style.all.css']=[base+'m*.css'];
    //grunt.task.loadTasks("grunt_tasks/tpl");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:conf_concat
    });




    //grunt.task.loadTasks("grunt_tasks/test2");

    // 加载所有grunt任务的插件。
    //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat']);

    // grunt.event.on('watch', function(action, filepath, target) {
    //     grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    //     if (/\.tpl$/.test(filepath) && !/deleted/.test(action)) {
    //         //如果是tpl文件 且不是删除动作
    //         grunt.config('compile.src', filepath);
    //     }
    // });

    grunt.registerTask('hello', 'A sample task that just say hello.', function(arg1, arg2) {
        console.log("hello");
    });

};