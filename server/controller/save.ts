const fs = require('fs-extra');
const path = require('path');
const md5 = require('blueimp-md5');

export interface MappingProps {
  createTime?: number;
  modifyTime?: number;
  id?: string;
  title?: string;
  url?: string;
}

const updateMappingRouter = (targetItem: MappingProps, isDelete?: boolean) => {
  const writeFilesPaths = [
    `src/assets/mapping.json`,
    `dist/assets/mapping.json`,
  ];
  const mappingPath = path.join(process.cwd(), writeFilesPaths[0]);
  if (!fs.existsSync(mappingPath)) {
    fs.writeFileSync(mappingPath, []);
  }
  const mappingFile = fs.readFileSync(mappingPath);
  const result = JSON.parse(mappingFile.toString());

  const isExistTargetIndex = result.findIndex(
    (item: MappingProps) => item.id === targetItem.id,
  );
  if (isExistTargetIndex > 0) {
    if (isDelete) {
      result.splice(isExistTargetIndex, 1);
    } else {
      result[isExistTargetIndex] = targetItem;
    }
  } else {
    result.push(targetItem);
  }

  for (const item of writeFilesPaths) {
    fs.outputJSON(path.join(process.cwd(), item), result, {
      spaces: 2,
    }).catch((err: any) => {
      console.error(err);
    });
  }
  // tslint:disable-next-line: no-console
  console.log(`mapping updated => ${targetItem.id}`);
};

// todo: refactor
const updateMapping = async (ctx: any) => {
  const body = ctx.request.body;
  const { layout, id, title, url } = body.layout;
  const writeFilesPaths = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  // 1. update assets
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
    // 2. update router
    updateMappingRouter({
      createTime,
      modifyTime: new Date().getTime(),
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
  const { title } = ctx.request.body;
  const dateTime = new Date().getTime();
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
      id,
      title,
      url: `./assets/mapping/${id}.json`,
      createTime: dateTime,
      modifyTime: dateTime,
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
export {};
