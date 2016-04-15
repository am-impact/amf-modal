module.exports = {
	dev: {
		options: {
			sourceMap: false,
			outputStyle: 'expanded'
		},
		files: {
			'dist/modal.css': 'src/scss/modal.scss'
		}
	},
	prod: {
		options: {
			sourceMap: false,
			outputStyle: 'compressed'
		},
		files: {
			'dist/modal.min.css': 'src/scss/modal.scss'
		}
	}
};
