import fs from 'fs-extra';
import { MappingProps } from '../controller/DocumentController';
import { joinWithRootPath, readJsonFile } from './common';

export type DocumentCategoryProps = 'markdown' | 'mapping';

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
  const result: MappingProps[] = readJsonFile(
    joinWithRootPath('src/assets/mapping.json'),
  );

  let types: string[] = [];
  result.map(item => {
    if (item.type && item.visible !== false) {
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
    if (item.visible !== false) {
      for (const menuItem of menu) {
        if (menuItem.key === item.type && item.subType) {
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
  fs.outputJSONSync(joinWithRootPath('src/assets/sider.json'), menu, {
    spaces: 2,
  });
};

const getWriteMappingPaths = (
  category?: DocumentCategoryProps,
  id?: string,
) => {
  if (!id || !category) {
    return [`src/assets/mapping.json`, `dist/assets/mapping.json`];
  }
  checkCategory(category);
  const ext = category === 'mapping' ? 'json' : 'md';
  return [
    `src/assets/${category}/${id}.${ext}`,
    `dist/${category}/${id}/${id}.${ext}`,
    `dist/${category}-editor/${id}/${id}.${ext}`,
  ];
};

export { getWriteMappingPaths, updateSider };
