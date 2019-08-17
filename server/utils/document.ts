import fs from 'fs-extra';
import path from 'path';
import { MappingProps } from '../controller/DocumentController';
import { info, error } from './log';
import { joinWithRootPath } from './common';

const checkCategory = (category: string) => {
  if (category !== 'mapping' && category !== 'markdown') {
    throw Error('category is neither "mapping" nor "markdown"');
  }
};

const unique = (target: any[]) => {
  const result: any = {};
  target.forEach(item => {
    result[JSON.stringify(item)] = item;
  });
  return Object.keys(result).map(item => JSON.parse(item));
};

const updateSider = () => {
  const mappingPath = path.join(process.cwd(), 'src/assets/mapping.json');
  const mappingFile = fs.readFileSync(mappingPath);
  const result: MappingProps[] = JSON.parse(mappingFile.toString());

  let types: string[] = [];
  result.map(item => {
    if (item.type) {
      types.push(item.type);
    }
  });
  types = Array.from(new Set(types));

  let menu = [];
  for (const type of types) {
    menu.push({
      key: type,
      title: type,
      children: [] as { key: string; value: string }[],
    });
  }
  for (const item of result) {
    for (const menuItem of menu) {
      if (menuItem.key === item.type) {
        if (item.subType) {
          menuItem.children.push({
            key: item.subType,
            value: item.subType,
          });
        }
      }
    }
  }
  for (const item of menu) {
    item.children = unique(item.children);
  }
  menu = [
    { key: 'all', title: 'all' },
    { key: 'ex-hentai-module', title: 'ex-hentai' },
    ...menu,
  ];
  fs.outputJSON(joinWithRootPath('src/assets/sider.json'), menu, {
    spaces: 2,
  })
    .then(() => {
      info('generate menu-sider completed.');
    })
    .catch(err => {
      error(err);
    });
};

const getWriteFilesPaths = (category?: 'markdown' | 'mapping', id?: string) => {
  if (!id || !category) {
    return [`src/assets/mapping.json`, `dist/assets/mapping.json`];
  }
  checkCategory(category);
  return [
    `src/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
    `dist/assets/${category}/${id}.${category === 'mapping' ? 'json' : 'md'}`,
  ];
};

export { getWriteFilesPaths, updateSider };
