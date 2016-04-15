module.exports = function(grunt) {
	require('time-grunt')(grunt);
  	require('load-grunt-config')(grunt);

  	grunt.task.run('notify_hooks');

	grunt.registerTask('default', [
		'jshint',
		'sass:dev',
		'concat',
		'autoprefixer:dev',
		'todo'
	]);

	grunt.registerTask('production', [
		'jshint',
		'sass:prod',
		'concat',
		'autoprefixer:prod',
		'uglify:prod'
	]);
};
