const fs = require('fs');
const path = require('path');
const content = require('../util/content');
const mimes = require('../util/mimes');

const get = async ctx => {
  // let name = ctx.params.name;

  ctx.type = 'html';
  ctx.response.body = fs.createReadStream(
    path.join(process.cwd(), 'index.html'),
  );
};

// 解析资源类型
const parseMime = url => {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : 'unknown';
  return mimes[extName];
};

const getDist = async ctx => {
  // 静态资源目录在本地的绝对路径
  const fullStaticPath = path.join(process.cwd(), '/dist');
  // 获取静态资源内容，有可能是文件内容，目录，或404
  const contentIns = await content(ctx, fullStaticPath);
  // 解析请求内容的类型
  const mime = parseMime(ctx.url);

  // 如果有对应的文件类型，就配置上下文的类型
  if (mime) {
    ctx.type = mime;
  }

  // 输出静态资源内容
  if (mime && mime.indexOf('image/') >= 0) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200);
    ctx.res.write(contentIns, 'binary');
    ctx.res.end();
  } else {
    // 其他则输出文本
    ctx.body = contentIns;
  }
};

module.exports = {
  'GET /': get,
  // 'GET /dist': getDist,
};
