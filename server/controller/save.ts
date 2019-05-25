import fs from 'fs-extra';
import md5 from 'blueimp-md5';
import path from 'path';

export interface MappingProps {
  createTime?: string;
  modifyTime?: string;
  id?: string;
  title?: string;
  url?: string;
}

const updateMappingRouter = (targetItem: MappingProps) => {
  const writeFilesPaths = [
    `src/assets/mapping.json`,
    `dist/assets/mapping.json`,
  ];
  for (const item of writeFilesPaths) {
    fs.outputJSON(path.join(process.cwd(), item), targetItem, {
      spaces: 2,
    }).catch((err: any) => {
      console.error(err);
    });
  }
  // tslint:disable-next-line: no-console
  console.log('update mapping router completed');
};

// todo: refactor
const updateMapping = async (ctx: any) => {
  const body = ctx.request.body;
  const { layout, id, title, url } = body.layout;
  const writeFilesPaths = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  try {
    for (const item of writeFilesPaths) {
      fs.outputJSON(path.join(process.cwd(), item), layout, {
        spaces: 2,
      })
        .then(() => {
          // tslint:disable-next-line: no-console
          console.log(`${id} written`);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
    const targetFile = fs.readFileSync(
      path.join(process.cwd(), `src/assets/mapping/${id}.json`),
    );
    const { createTime, title: originTitle, url: originUrl } = JSON.parse(
      targetFile.toString(),
    );
    updateMappingRouter({
      createTime,
      modifyTime: new Date().getTime().toString(),
      id,
      title: title || originTitle,
      url: url || originUrl,
    });
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = error.message;
  }
};

// 1. generate empty file in assets/mapping for mapping info
// 2. update router file
const initNewMapping = async (ctx: any) => {
  const { url, title } = ctx.request.body;
  const dateTime = new Date().getTime().toString();
  const id = md5(dateTime);
  const writeFilesPaths = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  try {
    // 1. generate empty file in assets/mapping for mapping info
    for (const item of writeFilesPaths) {
      fs.writeFileSync(path.join(process.cwd(), item), '');
    }
    // 2. update router file
    updateMappingRouter({
      createTime: dateTime,
      modifyTime: dateTime,
      id,
      title,
      url,
    });
    ctx.response.body = id;
  } catch (error) {
    console.error(error);
    ctx.response.body = error.message;
  }
};

module.exports = {
  'POST /save/mapping/update': updateMapping,
  'POST /save/mapping/new': initNewMapping,
};
