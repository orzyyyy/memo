const fs = require('fs-extra');
const path = require('path');

const del = async (ctx: any) => {
  const body = ctx.request.body;
  const id = body.id;
  const writeFiles = [`src/layout/${id}.json`, `dist/layout/${id}.json`];
  try {
    for (const item of writeFiles) {
      if (fs.existsSync(item)) {
        fs.unlinkSync(path.join(process.cwd(), item));
      } else {
        throw Error("file doesn't exist.");
      }
    }
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = false;
  }
};

module.exports = {
  'DELETE /del': del,
};
export {};
