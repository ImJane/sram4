var map = fis.compile.lang;


var yiiRegisterReg = /\$this->register(JsFile|Js|CssFile|Css)\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*')/g;
var pathReg = /___(uri|id|moduleId|hash|inline)\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*')\s*\)/g;

//对___uri("index.js")进行路径解析
fis.on('standard:restore:start', function(file){
    if(!file.isHtmlLike) return;
    var content = file.getContent();
    content = content.replace(pathReg, function(m, type, value) {
        if (type) {
            switch (type) {
                case 'uri':
                    m = map.uri.wrap(value);
                    break;
                case 'id':
                    m = map.id.wrap(value);
                    break;
                case 'moduleId':
                    m = map.moduleId.wrap(value);
                    break;
                case 'hash':
                    m = map.hash.wrap(value);
                    break;
                 case 'inline': 
                    m = map.embed.wrap(value);
                    break;
            }
        }
        return m;
    })
    file.setContent(content);
});

//对$this->register类进行uri路径解析
fis.on('standard:restore:start', function(file){
    if(!file.isHtmlLike) return;
	var content = file.getContent();
    content = content.replace(yiiRegisterReg, function(m, type, value) {
        if (type) {
            m = map.uri.wrap(value);
            m = "$this->register" + type + "(" + m
        }
        return m;
    })

    file.setContent(content);
}); 

