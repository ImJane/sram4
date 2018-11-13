var lang = fis.compile.lang;
var path = require('path');
var rRequire = /"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|(\/\/[^\r\n\f]+|\/\*[\s\S]+?(?:\*\/|$))|\b(require|sram\.use)\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|\[[\s\S]*?\])\s*/g;

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
    var extList = ['.js', '.jsx', '.coffee'];
    var info = fis.uri(name, path);

    for (var i = 0, len = extList.length; i < len && !info.file; i++) {
        info = fis.uri(name + extList[i], path);
    }

    return info;
}

// 按相对路径查找， 增加相对路径js coffee jsx不完整路径的查找
function onFileLookUpExt(file, v){
    var m = /^['"]([0-9a-zA-Z\.\-_]+)(?:\/(.+))?['"]$/.exec(v);
    var cName = m[1];
    var subpath = m[2];
    var resolved, url;
    var root = file ? file.dirname : fis.project.getProjectPath();

    //查找规则 原始路径查找 ./lib => ./lib.js or coffee jsx
    if (subpath) {
        resolved = findResource( cName + '/' + subpath, root );
    } else {
        //否则增加index ./lib/index => ./lib/index.js or coffee jsx
        resolved = findResource( cName + '/' + 'index', root );
        if (!resolved.file) {
            //否则增加index ./lib/lib => ./lib/lib.js or coffee jsx
            resolved = findResource( cName + '/' + cName, root );
        }
    }
    //如果根据规则找到了，返回id
    if (resolved.file) {
        url = '"' + resolved.file.getId() + '"';
    }

    return url;
}


function parseRequire(params){
    var name = params.name;
    var m = params.m;
    if(!['sram.use', 'require'].includes(name)) return m;
    var info = parseParams(params.options);
    var use = info.hasBrackets;
    var m = name + '(' + (use ? '[' : '') + info.params.map(function(v) {
        var type = lang.require;
        var src;
        if(!(/^['"]/.test(v))){
            return;
        }
        if(src = onFileLookUpExt(file.file, v)){
            v = src
        }
        return type.wrap(v);
    }).join(',') + (use ? ']' : '')
    return m;
}

// 解析sram.use, require
/*fis.on('standard:js', function(file) {
    var content = file.content;
    file.content = content.replace(rRequire, function(m, comment, type, params) {
        if (type) {
            m = parseRequire({
                name: type
                m: m,
                options: params
            })    
        }
        return m;
    })
})*/


// 处理所有js，在头部增加 sram.define
fis.on('compile:postprocessor', function(file){
    if(file.isJsLike && file.isMod){
        content = 'sram.define(\'' + file.getId() + '\', function(require, exports, module){\n' + file.getContent() + '\n\n});';
        file.setContent(content);
    }
})

// 检查是否是单个资源 也就是说 没有使用数组 []
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