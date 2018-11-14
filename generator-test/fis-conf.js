/*
 componenet_modules 构建内部生态
 根目录下存在component.json，用于编写项目依赖
 使用git push 版本号 打上 -tag
 使用 sram install github_name/project_name@version 下载组件以及模块
 */

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
      "parser": "babel-eslint",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "rules": {
        "no-underscore-dangle": 0,
        "no-unused-expressions": 1,
        "curly": 1,
        "no-unused-vars": 2,
        "no-use-before-define": 2,
        "no-multi-spaces": 1,
        "no-shadow": 2,
        "dot-notation": 2,
        "no-undef": 2,
        "block-scoped-var": 2,
        "no-empty": 1,
        "quotes": [2, "single", "avoid-escape"]
      }
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