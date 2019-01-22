const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

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

app.listen(9099);
// eslint-disable-next-line
console.log('listen at port 9099');
