const fs = require('fs');
const md5 = require('blueimp-md5');
const path = require('path');
const generate = require('../generateMapping');

const saveLayout = async ctx => {
  const body = ctx.request.body;
  const layout = body.layout;
  const id = body.id || md5(new Date().getTime());
  const writeFiles = [`src/layout/${id}.json`, `dist/layout/${id}.json`];
  try {
    for (let item of writeFiles) {
      fs.writeFileSync(path.join(process.cwd(), item), JSON.stringify(layout));
    }
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = false;
  }
};

const initMapping = async ctx => {
  const id = md5(new Date().getTime());
  const writeFiles = [`src/layout/${id}.json`, `dist/layout/${id}.json`];
  try {
    for (let item of writeFiles) {
      fs.writeFileSync(path.join(process.cwd(), item), '');
    }
    ctx.response.body = id;
    generate();
  } catch (error) {
    console.error(error);
    ctx.response.body = false;
  }
};

module.exports = {
  'POST /save': saveLayout,
  'POST /save/new': initMapping,
};
