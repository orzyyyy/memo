const fs = require('fs-extra');
const path = require('path');

const get = async (ctx: any) => {
  ctx.type = 'html';
  ctx.response.body = fs.createReadStream(
    path.join(process.cwd(), 'dist', 'index.html'),
  );
};

module.exports = {
  'GET /': get,
};
export {};
