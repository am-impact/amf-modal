module.exports = {
	prod: {
		options: {
			sourceMap: false,
			mangle: false
		},
		files: [
			{
				src: 'dist/modal.js',
				dest: 'dist/modal.min.js'
			}
		]
	}
};
