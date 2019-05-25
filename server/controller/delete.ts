const fs = require('fs-extra');
const path = require('path');
const { updateMappingRouter } = require('./save');

const del = async (ctx: any) => {
  const { id } = ctx.request.body;
  const writeFiles = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  try {
    for (const item of writeFiles) {
      if (fs.existsSync(item)) {
        fs.unlinkSync(path.join(process.cwd(), item));
      } else {
        throw Error(`${id} doesn't exist.`);
      }
    }
    updateMappingRouter({ id }, true);
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = false;
  }
};

module.exports = {
  'DELETE /del/mapping': del,
};
export {};
