fis.framework.wap({
	useSameNameRequire: false,
	debug: true,
	name: 'wap',
	version: '1.0.12',
	rootPrefix: '@',
	release: {
		views: '',
		web: ''
	},
	sramFramework: {
		cache: true,
		maxUrlLength: 1000,
		alias: {},
		combine: true,
		combineUrl: '/sram/%c',
		baseUrl: '/sram/%c'
	},
	jshint: false,
	eslint: false,
	es6: true
});