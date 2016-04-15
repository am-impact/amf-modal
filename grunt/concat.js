module.exports = {
	options: {
		separator: ';'
	},
	prod: {
		files: [
			{
				src: [
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
