fis.framework.wap({
  debug: false,
  name: 'sram',
  version: '1.0.12',
  rootPrefix: '@',
  release: {
    views: '',
    web: ''
  },
	sramFramework: {
    maxUrlLength: 1000,
    alias: {},
    combine: true,
		combineUrl: '/sram/%c',
    baseUrl: '/sram/%c'
	},
	jshint: {
		bhold: false,
		options: {
			ignored : [],
	    i18n : 'zh-CN',
		  bitwise: true,
		  camelcase: true,
		  eqeqeq: true,
		  forin: true,
		  immed: true,
		  indent: 4,
		  newcap: true,
		  noarg: true,
		  noempty: true,
		  nonew: true,
		  quotmark: "single",
		  undef: true,
		  unused: true,
		  strict: true,
		  boss: true,
		  trailing: true,
		  eqnull: true,
		  browser: true,
		  devel: true,
		  jquery: true,
		  node: true,
		  white: false
		}
	},
  eslint: {
    bhold: false,
    options: {
      
    }
  },
  es6: {
    babelrc: {
      plugins: [
        "babel-plugin-transform-runtime"
      ],
      presets: [
        "babel-preset-es2015",
        "babel-preset-stage-0"
      ]
    }
  }
});