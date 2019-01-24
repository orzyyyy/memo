const fs = require('fs');
const path = require('path');

const get = async ctx => {
  // let name = ctx.params.name;

  ctx.type = 'html';
  ctx.response.body = fs.createReadStream(
    path.join(process.cwd(), 'index.html'),
  );
};

module.exports = {
  'GET /': get,
};
