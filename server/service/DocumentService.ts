import fs from 'fs-extra';
import path from 'path';
import { omit } from '../utils/omit';
import prettier from 'prettier';
import { MappingProps } from '../controller/DocumentController';
import { getWriteMappingPaths } from '../utils/document';
import {
  joinWithRootPath,
  readJsonFile,
  writeIntoJsonFile,
} from '../utils/common';
import { success } from '../utils/log';
import { getTargetResource } from '../utils/resource';
const MappingDefaultValue = {
  CanvasPosition: {
    x: -3000,
    y: -3000,
    z: 0,
    gap: 1,
  },
  BlockGroup: {},
  TagGroup: {},
  LineGroup: {},
};

export default class DocumentService {
  config: any;

  constructor() {
    this.config = getTargetResource('server');
  }

  updateMapping = (targetItem: MappingProps, isDelete?: boolean) => {
    const removeKeys = [];
    // tslint:disable-next-line: forin
    for (const key in targetItem) {
      const value = targetItem[key];
      if (value === undefined) {
        removeKeys.push(key);
      }
    }
    targetItem = omit(targetItem, removeKeys) as MappingProps;
    const originMappingItem = this.getOriginMappingItem(targetItem.id);
    const writeFilesPaths = getWriteMappingPaths();
    const mappingPath = joinWithRootPath(writeFilesPaths[0]);
    if (!fs.existsSync(mappingPath)) {
      fs.writeFileSync(mappingPath, []);
    }
    const result: MappingProps[] = readJsonFile(mappingPath);
    const isExistTargetIndex = result.findIndex(
      (item: MappingProps) => item.id === targetItem.id,
    );
    const newItem = Object.assign({}, originMappingItem, targetItem);
    if (isExistTargetIndex > -1) {
      if (isDelete) {
        result.splice(isExistTargetIndex, 1);
      } else {
        result[isExistTargetIndex] = newItem;
      }
    } else {
      result.push(newItem);
    }
    writeFilesPaths.map(item => writeIntoJsonFile(item, result, true));
    success(`mapping updated => ${targetItem.id}`);
  };

  getOriginMappingItem = (id: string) => {
    const targetArr = readJsonFile(this.config.document.mappingFilePath).filter(
      (item: MappingProps) => item.id === id,
    );
    const time = new Date().getTime();
    const defaultItem = {
      createTime: time,
      modifyTime: time,
    };
    const targetItem = targetArr.length > 0 ? targetArr[0] : defaultItem;
    return targetItem;
  };

  getOriginContent = (filePath: string, layout: string | any, id: string) => {
    let result = layout;
    if (!layout && id) {
      try {
        result = readJsonFile(filePath);
      } catch (error) {
        result = fs.readFileSync(joinWithRootPath(filePath));
      }
    }
    return result;
  };

  initHtmlTemplate = (category: 'markdown' | 'mapping', originId: string) => {
    const editorPath = `dist/${category}-editor`;
    const detailPath = `dist/${category}`;
    // init dir
    fs.ensureDirSync(joinWithRootPath([editorPath, originId]));
    fs.ensureDirSync(joinWithRootPath([detailPath, originId]));

    const ext = category === 'markdown' ? 'md' : 'json';
    const existsDistDir = fs
      .readdirSync(joinWithRootPath(editorPath))
      .filter(item => item !== originId);
    const targetId = existsDistDir[existsDistDir.length - 1];
    const editorPrefix = joinWithRootPath([editorPath, targetId]);
    const detailPrefix = joinWithRootPath([detailPath, targetId]);
    const targetEditorTemplatePath = path.join(editorPrefix, 'index.html');
    const targetDetailTemplatePath = path.join(detailPrefix, 'index.html');

    // init document
    fs.ensureFileSync(
      joinWithRootPath([editorPath, originId, `${originId}.${ext}`]),
    );
    fs.ensureFileSync(
      joinWithRootPath([detailPath, originId, `${originId}.${ext}`]),
    );
    // copy html template
    fs.createReadStream(targetEditorTemplatePath).pipe(
      fs.createWriteStream(
        path.join(joinWithRootPath(editorPath), originId, 'index.html'),
      ),
    );
    fs.createReadStream(targetDetailTemplatePath).pipe(
      fs.createWriteStream(
        path.join(joinWithRootPath(detailPath), originId, 'index.html'),
      ),
    );
  };

  updateContent = (
    category: 'markdown' | 'mapping',
    writeFilesPaths: string[],
    content?: any,
  ) => {
    for (const item of writeFilesPaths) {
      if (category === 'markdown') {
        fs.writeFileSync(joinWithRootPath(item), content || '');
      }
      if (category === 'mapping') {
        writeIntoJsonFile(item, content || MappingDefaultValue, true);
      }
      success(`written completed => ${item}`);
    }
  };

  deleteTargetDocument = (writeFilesPaths: string[]) => {
    for (const item of writeFilesPaths) {
      if (fs.existsSync(item)) {
        fs.unlinkSync(joinWithRootPath(item));
      } else {
        throw Error(`${item} doesn't exist.`);
      }
    }
  };

  formattedByPrettier = (content: string) => {
    return prettier.format(content, {
      parser: 'markdown',
    });
  };
}
