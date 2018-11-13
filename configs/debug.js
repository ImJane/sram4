var debug = fis.media('debug');

debug.match(/^.*\.(css|js|png|jpg|jpeg)$/i, {
  useHash: false,
  useSprite: false,
  optimizer: null
});

// debug 模式下不压缩
debug.match(/^.*\.less$/i, {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
});