var fis = module.exports = require('fis3');
fis.cli.name = 'sram4';
fis.cli.version = '4.0.0';
fis.require.prefixes = [ 
	'sram',
	'sram4', 
	'fis3', 
	'fis' 
];

fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.framework = {};

fis.framework.wap = require('./configs/wap-test');


// 默认配置
//require('./configs/common');

// 命令行debug
//require('./configs/debug');

// web项目
//fis.framework.web = require('./configs/web');

// wap项目
//fis.framework.wap = require('./configs/wap');

Object.defineProperty(global, 'sram4', {
  enumerable : true,
  writable : false,
  value : fis
});