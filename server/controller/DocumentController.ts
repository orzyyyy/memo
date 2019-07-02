import fs, { readFileSync } from 'fs-extra';
import path from 'path';
import { Controller, Request } from '../utils/decorator';
import md5 from 'blueimp-md5';
import {
  joinWithRootPath,
  readJsonFile,
  writeIntoJsonFile,
} from '../utils/common';
import { success } from '../utils/log';
import { checkCategory } from '../utils/document';
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

export const updateMappingRouter = (
  targetItem: MappingProps,
  isDelete?: boolean,
  callback?: () => void,
) => {
  const writeFilesPaths = [
    `src/assets/mapping.json`,
    `dist/assets/mapping.json`,
  ];
  const mappingPath = joinWithRootPath(writeFilesPaths[0]);
  if (!fs.existsSync(mappingPath)) {
    fs.writeFileSync(mappingPath, []);
  }
  const result: MappingProps[] = readJsonFile(mappingPath);
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

  writeFilesPaths.map(item => writeIntoJsonFile(item, result, true));
  if (callback) {
    callback();
  }
  success(`mapping updated => ${targetItem.id}`);
};

@Controller('/document')
export default class MarkdownController {
  @Request({ url: '/update', method: 'post' })
  async updateTargetDocument(ctx: {
    request: {
      body: {
        layout: any;
        id: any;
        title: any;
        url: any;
        type: any;
        subType: any;
        category: any;
      };
    };
    response: { body: boolean };
    throw: (arg0: number, arg1: any) => void;
  }) {
    const {
      layout,
      id,
      title,
      url,
      type,
      subType,
      category,
    } = ctx.request.body;
    if (!id) {
      throw Error('id is undefined');
    }
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
    const writeFilesPaths = [
      `src/assets/${targetCategory}/${id}.${
        targetCategory === 'mapping' ? 'json' : 'md'
      }`,
      `dist/assets/${targetCategory}/${id}.${
        targetCategory === 'mapping' ? 'json' : 'md'
      }`,
    ];
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

    // update layout
    let originLayout = layout;
    if (!layout && id) {
      try {
        originLayout = readJsonFile(writeFilesPaths[0]);
      } catch (error) {
        originLayout = readFileSync(joinWithRootPath(writeFilesPaths[0]));
      }
    }

    try {
      for (const item of writeFilesPaths) {
        const targetPath = joinWithRootPath(item);
        if (targetCategory === 'markdown') {
          fs.writeFileSync(targetPath, originLayout);
        }
        if (targetCategory === 'mapping') {
          writeIntoJsonFile(targetPath, originLayout, true);
        }
        success(`written completed => ${item}`);
      }
      ctx.response.body = true;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }

  // 1. generate empty file in assets/mapping for mapping info
  // 2. update router file
  @Request({ url: '/add', method: 'post' })
  async initDocument(ctx: {
    request: { body: { title: any; type: any; subType: any; category: any } };
    response: { body: string };
    throw: (arg0: number, arg1: any) => void;
  }) {
    const { title, type, subType, category } = ctx.request.body;
    checkCategory(category);
    const timeStamp = new Date().getTime();
    const id = md5(timeStamp.toString());
    const writeFilesPaths = [
      `src/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
      `dist/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
    ];

    try {
      // generate empty file in assets/mapping for mapping info
      for (const item of writeFilesPaths) {
        if (category === 'markdown') {
          fs.writeFileSync(joinWithRootPath(item), '');
        }
        if (category === 'mapping') {
          writeIntoJsonFile(item, {
            CanvasPosition: {
              x: -2810,
              y: -3323,
              z: 0,
              gap: 1,
            },
            BlockGroup: {},
            TagGroup: {},
            LineGroup: {},
          });
        }
      }
      // update router file
      updateMappingRouter(
        {
          id,
          title,
          url: `./assets/mapping/${id}.json`,
          createTime: timeStamp,
          modifyTime: timeStamp,
          type,
          subType,
          category,
        },
        false,
        updateSider,
      );
      ctx.response.body = id;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }

  @Request({ url: '/delete', method: 'delete' })
  async delTargetDocument(ctx: {
    request: { body: { id: any; category: any } };
    response: { body: boolean };
    throw: (arg0: number, arg1: any) => void;
  }) {
    const { id, category } = ctx.request.body;
    checkCategory(category);
    const writeFilesPaths = [
      `src/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
      `dist/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
    ];

    try {
      for (const item of writeFilesPaths) {
        if (fs.existsSync(item)) {
          fs.unlinkSync(path.join(process.cwd(), item));
        } else {
          throw Error(`${item} doesn't exist.`);
        }
      }
      updateMappingRouter({ id } as any, true);
      ctx.response.body = true;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }
}
