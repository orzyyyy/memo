const router = require('koa-router')();
const fs = require('fs');
const cwd = process.cwd();
const path = require('path');

const addMapping = (router, mapping) => {
  for (let url in mapping) {
    let path = url.substring(4);
    if (url.startsWith('GET ')) {
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      path = url.substring(5);
      router.post(path, mapping[url]);
    } else if (url.startsWith('DELETE ')) {
      path = url.substring(7);
      router.delete(path, mapping[url]);
    } else if (url.startsWith('PUT ')) {
      path = url.substring(4);
      router.put(path, mapping[url]);
    } else {
      console.error(`invalid URL: ${url}`);
    }
  }
};

const addControllers = router => {
  let files = fs.readdirSync(path.join(cwd, '/server/controller'));
  let jsFiles = files.filter(f => {
    return f.endsWith('.js');
  });

  for (let file of jsFiles) {
    let mapping = require(path.join(cwd, '/server/controller/', file));
    addMapping(router, mapping);
  }
};

addControllers(router);

module.exports = router;
