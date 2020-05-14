import fs from 'fs-extra';
import path from 'path';
import { omit } from '../utils/omit';
import prettier from 'prettier';
import { MappingProps } from '../controller/DocumentController';
import { getWriteMappingPaths, DocumentCategoryProps } from '../utils/document';
import { joinWithRootPath, readJsonFile, writeIntoJsonFile, camelCase } from '../utils/common';
import { getTargetResource } from '../utils/resource';
import { getLogger } from '..';
const logger = getLogger('server/service/DocumentService.ts');

const MappingDefaultValue = {
  position: {
    root: {
      x: -3000,
      y: -3000,
    },
  },
  block: {},
  tag: {},
  line: {},
};

export default class DocumentService {
  config: any;

  constructor() {
    this.config = getTargetResource('server');
  }

  updateMapping = (targetItem: MappingProps, isDelete?: boolean) => {
    const removeKeys = [];
    for (const key in targetItem) {
      const value = (targetItem as any)[key];
      if (value === undefined) {
        removeKeys.push(key);
      }
    }
    targetItem = omit(targetItem, removeKeys as any) as MappingProps;
    const originMappingItem = this.getOriginMappingItem(targetItem.id);
    const writeFilesPaths = getWriteMappingPaths();
    const mappingPath = joinWithRootPath(writeFilesPaths[0]);
    const result: MappingProps[] = readJsonFile(mappingPath);
    const isExistTargetIndex = result.findIndex((item: MappingProps) => item.id === targetItem.id);
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
    logger.info(`mapping updated => ${targetItem.id}`);
    return result;
  };

  getOriginMappingItem = (id: string) => {
    const targetArr = readJsonFile(this.config.document.mappingFilePath).filter((item: MappingProps) => item.id === id);
    const time = new Date().getTime();
    const defaultItem = {
      createTime: time,
      modifyTime: time,
    };
    const targetItem = targetArr.length > 0 ? targetArr[0] : defaultItem;
    return targetItem;
  };

  getOriginContent = (filePath: string, layout: string | undefined, id: string) => {
    let result = layout;
    if (!layout && id) {
      result = readJsonFile(filePath);
    }
    return result;
  };

  initHtmlTemplate = (category: DocumentCategoryProps, originId: string) => {
    let templatePath = '';
    if (category === 'utils') {
      // generate html
      const targetPath = path.join(joinWithRootPath(`dist/utils/${originId}`), 'index.html');
      fs.ensureDirSync(joinWithRootPath(`dist/utils/${originId}`));
      templatePath = path.join(joinWithRootPath('dist/utils/index.html'));
      const templateContent = fs.readFileSync(templatePath).toString();
      fs.outputFileSync(targetPath, templateContent.replace('../ninoninoni.js', '../../util-wrapper.js'));
      const exportName = camelCase(originId);
      // generate document
      fs.outputFileSync(`src/assets/document/${originId}.md`, '- Description');
      // generate css
      fs.outputFileSync(`src/pages/css/${originId}.css`, `.${originId} {}`);
      // generate tsx
      fs.outputFileSync(
        joinWithRootPath(`src/pages/${exportName}.tsx`),
        `
import React from 'react';
import './css/${originId}.css';

const ${exportName} = ({ innerHTML }: { innerHTML: string }) => {
  return <div className="${originId}">
    ${exportName}
    <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
  </div>;
}

export default ${exportName};
      `,
      );
      return targetPath;
    }

    const editorPath = `dist/${category}-editor`;
    const detailPath = `dist/${category}`;
    const ext = category === 'markdown' ? 'md' : 'json';
    const arr = [editorPath, detailPath];
    // init dir
    arr.map(item => {
      fs.ensureDirSync(joinWithRootPath([item, originId]));
      const existsDistDir = fs.readdirSync(joinWithRootPath(editorPath)).filter(item => item !== originId);
      const targetId = existsDistDir[existsDistDir.length - 1];
      templatePath = path.join(joinWithRootPath([item, targetId]), 'index.html');
      // init document
      fs.ensureFileSync(joinWithRootPath([item, originId, `${originId}.${ext}`]));
      // copy html template
      fs.copyFileSync(templatePath, path.join(joinWithRootPath([item, originId]), 'index.html'));
    });

    return templatePath;
  };

  updateContent = (category: DocumentCategoryProps, writeFilesPaths: string[], content?: any) => {
    for (const item of writeFilesPaths) {
      if (category === 'markdown') {
        fs.writeFileSync(joinWithRootPath(item), content || '');
      }
      if (category === 'mapping') {
        writeIntoJsonFile(item, content || MappingDefaultValue, true);
      }
      logger.info(`written completed => ${item}`);
    }
  };

  deleteTargetDocument = (writeFilesPaths: string[]) => {
    for (const item of writeFilesPaths) {
      if (fs.existsSync(item)) {
        fs.unlinkSync(joinWithRootPath(item));
      }
    }
  };

  formattedByPrettier = (content: string | undefined) => {
    return prettier.format(content || '', {
      parser: 'markdown',
    });
  };
}
