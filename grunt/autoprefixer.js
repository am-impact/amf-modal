var files = {
		'dist/modal.css': 'dist/modal.css'
	},
	browsers = ['last 2 versions', 'ie 9'];

module.exports = {
	dev: {
		options: {
			browsers: browsers,
			map: false
		},
		files: files
	},
	prod: {
		options: {
			browsers: browsers,
			map: false
		},
		files: files
	}
};
