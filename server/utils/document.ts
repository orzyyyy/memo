import fs from 'fs-extra';
import { MappingProps } from '../controller/DocumentController';
import { joinWithRootPath, readJsonFile } from './common';

export type DocumentCategoryProps = 'markdown' | 'mapping' | undefined;
export type SiderChildrenProps = { key: string; value: string };
export type SiderProps = {
  key: string;
  title: string;
  children?: SiderChildrenProps[];
};

const unique = (target: any[]) => {
  const result: any = {};
  target.forEach(item => {
    result[JSON.stringify(item)] = item;
  });
  return Object.keys(result).map(item => JSON.parse(item));
};

export const updateSider = () => {
  const result: MappingProps[] = readJsonFile(joinWithRootPath('src/assets/mapping.json'));

  let types: string[] = [];
  result.map(item => {
    if (item.type && item.visible !== false) {
      types.push(item.type);
    }
  });
  types = Array.from(new Set(types));

  let menu: SiderProps[] = [];
  for (const type of types) {
    menu.push({
      key: type,
      title: type,
      children: [],
    });
  }
  for (const item of result) {
    if (item.visible !== false) {
      for (const menuItem of menu) {
        if (menuItem.key === item.type && item.subType && menuItem.children) {
          menuItem.children.push({
            key: item.subType,
            value: item.subType,
          });
        }
      }
    }
  }
  for (const item of menu) {
    if (item.children) {
      item.children = unique(item.children);
    }
  }
  menu = [{ key: 'all', title: 'all' }, { key: 'ex-hentai-module', title: 'ex-hentai' }, ...menu];
  fs.outputJSONSync(joinWithRootPath('src/assets/sider.json'), menu, {
    spaces: 2,
  });
  return menu;
};

export const getWriteMappingPaths = (category?: DocumentCategoryProps, id?: string) => {
  if (!id || !category) {
    return [`src/assets/mapping.json`, `dist/assets/mapping.json`];
  }
  const ext = category === 'mapping' ? 'json' : 'md';
  return [
    `src/assets/${category}/${id}.${ext}`,
    `dist/${category}/${id}/${id}.${ext}`,
    `dist/${category}-editor/${id}/${id}.${ext}`,
  ];
};
