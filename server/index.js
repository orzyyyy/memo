const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const content = require('./util/content');
const mimes = require('./util/mimes');

// 解析资源类型
const parseMime = url => {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : 'unknown';
  return mimes[extName];
};

const addMapping = (router, mapping) => {
  for (let url in mapping) {
    let path = url.substring(4);
    if (url.startsWith('GET ')) {
      router.get(path, mapping[url]);
      // eslint-disable-next-line
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      path = url.substring(5);
      router.post(path, mapping[url]);
      // eslint-disable-next-line
      console.log(`register URL mapping: POST ${path}`);
    } else {
      // eslint-disable-next-line
      console.log(`invalid URL: ${url}`);
    }
  }
};

const addControllers = router => {
  let files = fs.readdirSync(__dirname + '/controller');
  let jsFiles = files.filter(f => {
    return f.endsWith('.js');
  });

  for (let file of jsFiles) {
    let mapping = require(__dirname + '/controller/' + file);
    addMapping(router, mapping);
  }
};

addControllers(router);
app.use(bodyParser());
app.use(router.routes());

app.use(async ctx => {
  // 静态资源目录在本地的绝对路径
  const fullStaticPath = path.join(process.cwd());
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
});

app.listen(9099);
// eslint-disable-next-line
console.log('listen at port 9099');
