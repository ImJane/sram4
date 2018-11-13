//var styleReg = /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig;

fis.match('**', {
  release : false,
  useHash : false,
  useSameNameRequire: true
});

fis.match(/^.*\.(css|js|jpeg|jpg|png)$/i, {
	useHash: true
})

// 内置
fis.match(/^.*\.css$/i, {
	optimizer: fis.plugin('clean-css'),
  useSprite: true
});

// 内置
fis.match(/^.*\.js$/i, {
	optimizer: fis.plugin('uglify-js'),
  lint: fis.plugin('jshint'),
  rExt: '.js'
});

// 内置
fis.match(/^.*\.png$/i, {
	optimizer: fis.plugin('png-compressor')
});


fis.match(/^.*\.(hbs|handlebars)$/i, {
  parser: fis.plugin('handlebars-4.x'),
  rExt: '.js'
});

// 正式环境下压缩
fis.match(/^.*\.less$/i, {
  parser: fis.plugin('less-2.x', {
    compress: true
  }),
  rExt: '.css'
});

fis.match(/^.*\.(sass|scss)$/i, {
  parser: fis.plugin('node-sass-we'),
  rExt: '.css'
});

fis.match(/^.*\.styl$/i, {
  parser: fis.plugin('stylus'),
  rExt: '.css'
})

fis.match('::package', {
	spriter: fis.plugin('csssprites', {
  	htmlUseSprite: true,
  	styleReg: styleReg
	})
});

fis.match(/^\/component|map\.json$/i, {
    release: '$1'
}); 