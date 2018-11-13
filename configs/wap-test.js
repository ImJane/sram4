



module.exports = function(options){
  fis.config.set('name', options.name || 'wap');
  fis.config.set('version', options.version || '1.0.0');
  fis.config.set('releaseViewPrefix', options.release.views || '/views');
  fis.config.set('releasePrefix', options.release.web || '/web');
  fis.config.set('urlPrefix', options.urlPrefix || '');
  fis.config.set('framework', options.framework || {});

	fis.match('**', {
    release : false,
    useHash : false,
    useSameNameRequire: true
	});

	fis.match(/^.*\.(css|js|styl|es6|less|jpeg|jpg|png)$/i, {
		useHash: true
	})

  fis.match(/^.*\.es6$/i, {
    parser: fis.plugin('babel6', options.es6.babelrc),
    rExt: '.js'
  });

	fis.match(/^.*\.styl$/i, {
	  parser: fis.plugin('stylus'),
	  rExt: '.css'
	})

	fis.match(/^\/component|map\.json$/i, {
	    release: '$1'
	}); 

  // 内置
  fis.match(/^.*\.css$/i, {
    optimizer: fis.plugin('clean-css'),
    useSprite: true
  });
  
  // 内置
  fis.match(/^.*\.(js|es6)$/i, {
    optimizer: fis.plugin('uglify-js'),
    rExt: '.js'
  });

  // 内置
  fis.match(/^.*\.png$/i, {
    optimizer: fis.plugin('png-compressor')
  });

  fis.match(/^.*\.less$/i, {
    parser: fis.plugin('less-2.x', {
      compress: true
    }),
    rExt: '.css'
  });

  if(options.jshint.bhold){
    fis.match(/^.*\.js$/i, {
      useLint: true,
      ignored: [],
      lint: fis.plugin('jshint', options.jshint.options || {}),
    });
  }
  
  if(options.eslint.bhold){
    fis.match(/^.*\.es6$/i, {
      lint: fis.plugin('eslint', options.eslint.options || {})
    });
  }

  if(options.debug){

    fis.match(/^.*\.(css|js|styl|es6|less|jpeg|jpg|png)$/i, {
      useHash: false,
      useSprite: false,
      optimizer: null
    });

    fis.match(/^.*\.less$/i, {
      parser: fis.plugin('less-2.x'),
      rExt: '.css'
    });

  }

  //公共资源区
  fis.match(/^\/component_modules\/(.*)\.(styl|less|css)$/i, { 
    id : 'c/$1.css',  
    isMod: true,
    isCommon: true,
    url : '${urlPrefix}/c/$1.$2',
    release : '${releasePrefix}/c/$1.$2'
  });

  fis.match(/^\/component_modules\/(.*\.js)$/i, {
    id : 'c/$1',
    isMod: true,
    isCommon: true,
    url : '${urlPrefix}/c/$1',
    release : '${releasePrefix}/c/$1'
  });

  fis.match(/^\/component_modules\/(.*)$/i, {
    isCommon: true,
    url : '${urlPrefix}/c/$1',
    release : '${releasePrefix}/c/$1'
  });

  //项目组件化
  fis.match(/^\/components\/(.*)\.(styl|less|css)$/i, {
    id : 'w/$1.css',
    isMod: true,
    isComponents: true,
    url : '${urlPrefix}/w/$1.$2',
    release : '${releasePrefix}/w/$1.$2'
  })

  fis.match(/^\/components\/(.*\.js)$/i, {
    id : 'w/$1',
    isMod: true,
    isComponents:true,  
    url : '${urlPrefix}/w/$1',
    release : '${releasePrefix}/w/$1'
  });

  fis.match(/^\/components\/(.*)$/i,  {
    isComponents: true,
    url : '${urlPrefix}/w/$1',
    release : '${releasePrefix}/w/$1'
  });
  
  fis.match(/^\/components\/.*\.tpl$/i,  {
    release : false
  });

  //非模块化静态资源区
  fis.match(/^\/(lib|assets)\/(.*)\.(styl|less|css)$/i, {
    id : 's/$1.css',
    isStatic: true,
    url : '${urlPrefix}/s/$1.$2',
    release : '${releasePrefix}/s/$1.$2'
  });

  fis.match(/^\/(lib|assets)\/(.*\.js)$/i, {
    id : 's/$1',
    isStatic: true,
    url : '${urlPrefix}/s/$1',
    release : '${releasePrefix}/s/$1'
  });

  fis.match(/^\/(lib|assets)\/(.*)$/i, {
    isStatic: true,
    url : '${urlPrefix}/s/$1',
    release : '${releasePrefix}/s/$1'
  });

  //视图
  // fis.match(/^\/views\/(.*)\.(styl|sass|scss|less|css)$/i, {
  //   id : 'v/$1.css',
  //   isViews: true,
  //   url : '${urlPrefix}/v/$1.$2',
  //   release : '${releasePrefix}/v/$1.$2'
  // });

  // fis.match(/^\/views\/(.*\.js)$/i, {
  //   id : 'v/$1',
  //   useCache : false,
  //   isViews: true,
  //   url : '${urlPrefix}/v/$1',
  //   release : '${releasePrefix}/v/$1'
  // });

  // fis.match(/^\/views\/(.*)$/i, {
  //   isViews: true,
  //   url : '${urlPrefix}/v/$1',
  //   release : '${releasePrefix}/v/$1'
  // });

  // fis.match(/^(\/views\/.*)\/(.*)\/(index|$2)\.(jade|ejs|swig|html|php)$/i, {
  //   isViews: true,
  //   release : '${releaseViewPrefix}/$1/$2.$4'
  // });


}