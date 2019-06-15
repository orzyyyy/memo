const fs = require('fs-extra');
const path = require('path');
const md5 = require('blueimp-md5');
const { updateSider } = require('../../scripts/generateSider');

export interface MappingProps {
  createTime: number;
  modifyTime: number;
  id: string;
  title: string;
  url: string;
  type: string;
  subType: string;
  category: 'mapping' | 'markdown';
}

const updateMappingRouter = (
  targetItem: MappingProps,
  isDelete?: boolean,
  callback?: () => void,
) => {
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
  if (isExistTargetIndex > -1) {
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
  if (callback) {
    callback();
  }
  // tslint:disable-next-line: no-console
  console.log(`mapping updated => ${targetItem.id}`);
};

// todo: refactor
const updateTargetMapping = async (ctx: any) => {
  const { layout, id, title, url, type, subType, category } = ctx.request.body;
  if (!id) {
    throw Error('id is undefined.');
  }
  const mappingPaths = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  const markdownPaths = [
    `src/assets/markdown/${id}.md`,
    `dist/assets/markdown/${id}.md`,
  ];
  let targetPaths: string[] = [];

  // update router
  const targetFile = fs
    .readFileSync(path.join(process.cwd(), 'src/assets/mapping.json'))
    .toString();
  const targetJSONFile = JSON.parse(targetFile);
  const targetArr = targetJSONFile.filter(
    (item: MappingProps) => item.id === id,
  );
  const targetItem = targetArr.length > 0 ? targetArr[0] : {};
  const {
    createTime,
    title: originTitle,
    url: originUrl,
    type: originType,
    subType: originSubType,
    category: originCategory,
  } = targetItem;
  const targetCategory = category || originCategory;
  updateMappingRouter({
    id,
    title: title || originTitle,
    url: url || originUrl,
    createTime,
    modifyTime: new Date().getTime(),
    type: type || originType,
    subType: subType || originSubType,
    category: targetCategory,
  });

  switch (targetCategory) {
    case 'mapping':
      targetPaths = mappingPaths;
      break;

    case 'markdown':
      targetPaths = markdownPaths;
      break;

    default:
      break;
  }

  // update layout
  let originLayout = layout;
  if (!layout && id) {
    const targetLayoutFile = fs.readFileSync(
      path.join(path.join(process.cwd(), targetPaths[0])),
    );
    originLayout = JSON.parse(targetLayoutFile.toString());
  }

  try {
    for (const item of targetPaths) {
      if (targetCategory === 'markdown') {
        fs.writeFileSync(path.join(process.cwd(), item), originLayout);
      }
      if (targetCategory === 'mapping') {
        fs.outputJSON(path.join(process.cwd(), item), originLayout, {
          spaces: 2,
        }).catch((err: any) => {
          console.error(err);
        });
      }
      // tslint:disable-next-line: no-console
      console.log(`written completed => ${item}`);
    }
    ctx.response.body = true;
  } catch (error) {
    ctx.response.body = error.message;
  }
};

// 1. generate empty file in assets/mapping for mapping info
// 2. update router file
const initNewMapping = async (ctx: any) => {
  const { title, type, subType, category } = ctx.request.body;
  const dateTime = new Date().getTime();
  const id = md5(dateTime);
  const mappingPaths = [
    `src/assets/mapping/${id}.json`,
    `dist/assets/mapping/${id}.json`,
  ];
  const markdownPaths = [
    `src/assets/markdown/${id}.md`,
    `dist/assets/markdown/${id}.md`,
  ];
  let targetPaths: string[] = [];

  switch (category) {
    case 'mapping':
      targetPaths = mappingPaths;
      break;

    case 'markdown':
      targetPaths = markdownPaths;
      break;

    default:
      break;
  }

  try {
    // generate empty file in assets/mapping for mapping info
    for (const item of targetPaths) {
      fs.writeFileSync(path.join(process.cwd(), item), '');
    }
    // update router file
    updateMappingRouter(
      {
        id,
        title,
        url: `./assets/mapping/${id}.json`,
        createTime: dateTime,
        modifyTime: dateTime,
        type,
        subType,
        category,
      },
      false,
      updateSider,
    );
    ctx.response.body = id;
  } catch (error) {
    console.error(error);
    ctx.response.body = error.message;
  }
};

module.exports = {
  'POST /save/update': updateTargetMapping,
  'POST /save/new': initNewMapping,
  updateMappingRouter: updateMappingRouter,
};
export {};
