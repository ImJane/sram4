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

Object.defineProperty(global, 'sram4', {
	enumerable : true,
	writable : false,
	value : fis
});

/*
* 1 跳转回商品筛选页
* 例如：path = '/pages/list/list?cate=computer&short=gz&cate_name=电脑&back=1'
* 当back = 1时，将back回产品筛选页，并且会更新产品筛选的 筛选栏
*
* 4 跳转指定小程序页面 
*/