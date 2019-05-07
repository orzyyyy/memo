const fs = require('fs-extra');
const md5 = require('blueimp-md5');
const path = require('path');
const generate = require('../generate');

const saveLayout = async (ctx: any) => {
  const body = ctx.request.body;
  const layout = body.layout;
  const id = body.id || md5(new Date().getTime());
  const writeFiles = [`src/layout/${id}.json`, `dist/layout/${id}.json`];
  try {
    for (let item of writeFiles) {
      fs.outputJSON(path.join(process.cwd(), item), layout, {
        spaces: 2,
      })
        .then(() => {
          console.log(`${id} written`);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = false;
  }
};

const initMapping = async (ctx: any) => {
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
export {};
