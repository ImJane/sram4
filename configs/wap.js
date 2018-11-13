module.exports = function(options){

    fis.config.set('name', options.name || 'webapp');
    fis.config.set('version', options.version || '1.0.0');
    fis.config.set('releaseViewPrefix', options.releaseViewPrefix || '');
    fis.config.set('releaseControllersPrefix', options.releaseControllersPrefix || '');
    fis.config.set('releasePrefix', options.releasePrefix || '');
    fis.config.set('urlPrefix', options.urlPrefix || '');
    fis.config.set('framework', options.framework || {});


    var plugins = {
        framework : require('../plugins/postpackager/framework'),
    };

    require('../hook/define');
    require('../hook/wap');
 
    fis.match('::package', {
        postpackager: plugins.framework
    });
 
    //公共资源区
    fis.match(/^\/component_modules\/(.*)\.(styl|sass|scss|less|css)$/i, { 
        id : 'c/$1.css',  
        useHash: false, 
        isMod: true,
        isCommon: true,
        url : '${urlPrefix}/c/$1.$2',
        release : '${releasePrefix}/c/$1.$2'
    });

    fis.match(/^\/component_modules\/(.*\.js)$/i, {
        id : 'c/$1',
        useHash: false,
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

    fis.match(/^\/component_modules\/(.*)\.(hbs|handlebars)$/i, {
        id : 'c/$1.$2.js',
        useHash: false,
        isMod: true,
        isComponents:true,
        url : '${urlPrefix}/c/$1.$2.js',
        release : '${releasePrefix}/c/$1.$2.js'
    });

    //项目组件化
    fis.match(/^\/components\/(.*)\.(styl|sass|scss|less|css)$/i, {
        id : 'w/$1.css',
        useHash: false,
        isMod: true,
        isComponents: true,
        url : '${urlPrefix}/w/$1.$2',
        release : '${releasePrefix}/w/$1.$2'
    })

    fis.match(/^\/components\/(.*\.js)$/i, {
        id : 'w/$1',
        useHash: false,
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

    /*
     * require x.hbs or x.handlebars;
     */
    fis.match(/^\/components\/(.*)\.(hbs|handlebars)$/i, {
        id : 'w/$1.$2.js',
        useHash: false,
        isMod: true,
        isComponents:true,
        url : '${urlPrefix}/w/$1.$2.js',
        release : '${releasePrefix}/w/$1.$2.js'
    });

    fis.match(/^\/components\/.*\.tpl$/i,  {
        release : false
    });

    //非模块化静态资源区
    fis.match(/^\/lib\/(.*)\.(styl|sass|scss|less|css)$/i, {
        id : 's/$1.css',
        isStatic: true,
        url : '${urlPrefix}/s/$1.$2',
        release : '${releasePrefix}/s/$1.$2'
    });

    fis.match(/^\/lib\/(.*\.js)$/i, {
        id : 's/$1',
        isStatic: true,
        url : '${urlPrefix}/s/$1',
        release : '${releasePrefix}/s/$1'
    });

    fis.match(/^\/lib\/(.*)$/i, {
        isStatic: true,
        url : '${urlPrefix}/s/$1',
        release : '${releasePrefix}/s/$1'
    });

    //视图
    fis.match(/^\/views\/(.*)\.(styl|sass|scss|less|css)$/i, {
        id : 'v/$1.css',
        isViews: true,
        url : '${urlPrefix}/v/$1.$2',
        release : '${releasePrefix}/v/$1.$2'
    });

    fis.match(/^\/views\/(.*\.js)$/i, {
        id : 'v/$1',
        useCache : false,
        isViews: true,
        url : '${urlPrefix}/v/$1',
        release : '${releasePrefix}/v/$1'
    });

    fis.match(/^\/views\/(.*)$/i, {
        isViews: true,
        url : '${urlPrefix}/v/$1',
        release : '${releasePrefix}/v/$1'
    });

    fis.match(/^(\/views\/.*)\/(.*)\/(index|$2)\.(jade|ejs|swig|html|php)$/i, {
        isViews: true,
        release : '${releaseViewPrefix}/$1/$2.$4'
    });
}




