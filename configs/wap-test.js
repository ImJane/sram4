let extend = require("extend");
let fs = require('fs');
let util = require('../lib/util');
let rRequire = /"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|(\/\/[^\r\n\f]+|\/\*[\s\S]+?(?:\*\/|$))|\b(require|sram\.use)\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|\[[\s\S]*?\])\s*/g;
let lang = fis.compile.lang;
let path = require('path');


// 拼 rootPrefix
function getRootReg(prefix){
  prefix = prefix ? "(" + prefix + "?)" : '';
  return new RegExp("^[\'\"]" + prefix + "([0-9a-zA-Z\\.\\-_]+)(?:\\/|(.+))?[\'\"]$");
}

// 按nodejs的规则查找js文件
function onFileLookUpExt(file, v, options){
    //首字母规则为@则直接获取根目录
    var m = getRootReg(options.rootPrefix).exec(v);
    var rootPrefix = m[1];
    var c = m[2];
    var subpath = m[3];
    var resolved, url;
    var root = fis.project.getProjectPath();
    if(!options.rootPrefix){
      root = file ? file.dirname : fis.project.getProjectPath();
    }
    
    if (subpath) {
        resolved = findResource( c + '/' + subpath, root );
    } else {
        resolved = findResource( c + '/' + 'index', root );
        if (!resolved.file) {
            resolved = findResource( c + '/' + c, root );
        }
    }
    
    if (resolved.file) {
        url = '"' + resolved.file.getId() + '"';
    }

    return url;
}

function findResource(name, dir) {
    var list = [
        name, // components/lazyload/./lib
        path.join(name, 'index'), // components/lazyload/./lib/index
        path.join(name, path.basename(name)) // components/lazyload/./lib/lib
    ];
    var info;
    // 过滤
    while (list.length) {
        name = list.shift();
        info = _findResource(name, dir);
        if (info && info.file) {
            break;
        }
    }

    return info;
}

function _findResource(name, path) {
    var extList = ['.js', '.jsx', '.es6', '.coffee'];
    var info = fis.uri(name, path);

    for (var i = 0, len = extList.length; i < len && !info.file; i++) {
        info = fis.uri(name + extList[i], path);
    }

    return info;
}

// 统一加JSON报错处理
function readFileRc(path){
  let rc = {};
  try{
      rc = fs.readFileSync(`${fis.project.getProjectPath()}/${path}`, 'utf-8');
  }catch(e){ }
  return util.readJSON(rc);;
}

// 检查是否是单个资源
function parseParams(value) {
    var hasBrackets = false;
    var params = [];

    value = value.trim().replace(/(^\[|\]$)/g, function(m, v) {
        if (v) {
            hasBrackets = true;
        }
        return '';
    });
    params = value.split(/\s*,\s*/);
    return {
        params: params,
        hasBrackets: hasBrackets
    };
}

module.exports = function(params){

  let rootPrefix = params.rootPrefix || '';
  // 处理模块化
  fis.on('compile:postprocessor', function(file){
    if(file.isJsLike && file.isMod){
      content = 'sram.define(\'' + file.getId() + '\', function(require, exports, module){\n' + file.getContent() + '\n\n});';
      file.setContent(content);
    }
  })
  
  // 处理php文件
  fis.on('compile:postprocessor', function(file){
    if(file.isPhp){
      var map = fis.compile.lang;
      var reg = /(\<\?(?:=)[\s\S]*?)(?:(\$this->sram_require)\(\s*('[^']+'|"[^"]+")\s*([\s\S]*?\?>))/g;
      content = content.replace(reg, function(m, $1, $2, $3, $4, $5, $6, $7){
        console.log(m, $1, $2, $3, $4, $5, $6, $7)
        return content;
      });
    }
    return content;
  });

  // 标准化js文件，isJsLike的文件，script标签 
  fis.on('standard:js', function(file) {
    var content = file.content;
    file.content = content.replace(rRequire, function(m, comment, type, params) {
      if(type){
        var info = parseParams(params);
        var use = info.hasBrackets;
        m = type + '(' + (use ? '[' : '') + info.params.map(function(v) {
          var type = lang.require;
          var src;
          if(!(/^['"]/.test(v))) return;
          if(src = onFileLookUpExt(file.file, v, {
            rootPrefix: rootPrefix
          })){
              v = src
          }
          return type.wrap(v);
        }).join(',') + (use ? ']' : '')
        return m;
      }
    })
  });

  fis.match('**', {
    release : false,
    useHash : false,
  });

  fis.match(/^.*\.es6$/i, {
    parser: fis.plugin('babel6', readFileRc('.babelrc')),
    rExt: '.js'
  });

  fis.match(/^.*\.styl$/i, {
    parser: fis.plugin('stylus'),
    rExt: '.css'
  });

  fis.match(/^.*\.less$/i, {
    parser: fis.plugin('less-2.x', {
      compress: true
    }),
    rExt: '.css'
  });

  if(params.jshint){
    fis.match(/^.*\.js$/i, {
      useLint: true,
      lint: fis.plugin('jshint', readFileRc('.jshintrc')),
    });
  }
  
  if(params.eslint){
    fis.match(/^.*\.es6$/i, {
      lint: fis.plugin('eslint', readFileRc('.eslintrc'))
    });
  }

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

  //项目组件化
  fis.match(/^\/components\/(.*)\.(styl|less|css)$/i, {
    id : 'w/$1.css',
    isMod: true,
    isComponents: true,
    url : 'w/$1.$2',
    release : 'w/$1.$2'
  })

  fis.match(/^\/components\/(.*)\.(?:js|es6)$/i, {
    id : 'w/$1.js',
    isMod: true,
    isComponents:true,  
    url : 'w/$1.js',
    release : 'w/$1.js'
  });

  fis.match(/^\/components\/(.*)$/i,  {
    isComponents: true,
    url : 'w/$1',
    release : 'w/$1'
  });
  
  fis.match(/^\/components\/.*\.tpl$/i,  {
    release : false
  });
  
  if(params.debug){
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

  //视图
  fis.match(/^\/views\/(.*)\.(styl|less|css)$/i, {
    id : 'v/$1.css',
    isViews: true,
    url : 'v/$1.$2',
    release : 'v/$1.$2'
  });

  fis.match(/^\/views\/(.*)\.(js|es6)$/i, {
    id : 'v/$1.$2',
    useCache : false,
    isViews: true,
    url : 'v/$1.$2',
    release : 'v/$1.$2'
  });

  fis.match(/^\/views\/(.*)\.(php)$/i, {
    parser: fis.plugin('babel6', readFileRc('.babelrc')),
    isViews: true,
    isPhp: true,
    release : 'v/$1.$2'
  });
  
  fis.match(/^\/views\/(.*)$/i, {
    isViews: true,
    url : 'v/$1',
    release : 'v/$1'
  });  
}
