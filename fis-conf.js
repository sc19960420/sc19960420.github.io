//ES 6 to ES5
fis.set('project.fileType.text', 'js');
fis.match('*.js', {
	parser: fis.plugin('babel-5.x', {
		blacklist: ['regenerator'],
		optional: ['asyncToGenerator'],
		stage: 3
	}),
	sourceMaps: true,
	rExt: 'js'
});

/*使用相对路径*/
fis.hook('relative');
fis.match('*', {
	relative: true
})

//	Use Less
//	npm install -g fis-parser-less
//	npm install -g fis3-postpackager-loader
//	npm install -g fis3-preprocessor-autoprefixer
fis.match('*.less', {
	parser: fis.plugin('less'),
	rExt: '.css',
	preprocessor: fis.plugin("autoprefixer", {
		"browsers": ["Android >= 4", "iOS >= 8", "ie >= 8", "firefox >= 15"],
		"cascade": true
	}),
	optimizer: fis.plugin('clean-css')
})

fis.match('**', {
	deploy: [
		fis.plugin('skip-packed', {
			// 配置项
		}),

		fis.plugin('local-deliver', {
			//to: 'output'
		})
	]
})

/*合并打包*/
fis.match('*.js', {
	optimizer: fis.plugin('uglify-js')
});

fis.match('::package', {
	postpackager: fis.plugin('loader', {
		allInOne: {
			js: function(file) {
				return "/js/" + file.filename + "_all.js";
			},
			css: function(file) {
				return "/css/" + file.filename + "_all.css";
			}
		}
	}),
});