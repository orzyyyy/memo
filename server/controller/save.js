const fs = require('fs');
const md5 = require('blueimp-md5');
const path = require('path');

const saveLayout = async ctx => {
  const body = ctx.request.body;
  const layout = body.layout;
  const id = body.id || md5(new Date().getTime());
  await fs.writeFile(
    path.join(process.cwd(), `src/layout/${id}.json`),
    JSON.stringify(layout),
    error => {
      if (error) {
        throw new Error(error);
      }
    },
  );
  ctx.response.body = true;
};

module.exports = {
  'POST /save': saveLayout,
};
