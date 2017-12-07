module.exports = {
	options: {
		separator: ';'
	},
	prod: {
		files: [
			{
				src: [
					'src/js/polyfill.js',
					'src/js/modal.js'
				],
				dest: 'dist/modal.js',
				options: {
					sourceMap: false
				}
			}
		]
	}
};
