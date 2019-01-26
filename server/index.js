const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const content = require('./util/content');
const mimes = require('./util/mimes');

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
    } else if (url.startsWith('POST ')) {
      path = url.substring(5);
      router.post(path, mapping[url]);
    } else {
      console.error(`invalid URL: ${url}`);
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
  const fullStaticPath = path.join(process.cwd());
  const contentIns = await content(ctx, fullStaticPath);
  const mime = parseMime(ctx.url);

  if (mime) {
    ctx.type = mime;
  }

  if (mime && mime.indexOf('image/') >= 0) {
    ctx.res.writeHead(200);
    ctx.res.write(contentIns, 'binary');
    ctx.res.end();
  } else {
    ctx.body = contentIns;
  }
});

app.listen(9099);
// eslint-disable-next-line
console.log('listen at port 9099');
