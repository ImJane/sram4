let util = module.exports = {};

util.readJSON = function (content, path){
  try {
    return JSON.parse(content);
  } catch (e){
    console.log('invalid json file [' + path + '] : ' + e.message);
  }
}
