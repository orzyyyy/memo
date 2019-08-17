import { joinWithRootPath, readJsonFile } from './common';
import fs from 'fs-extra';
import path from 'path';
import { getTargetResource } from './resource';

const { listInfoPath } = getTargetResource('server').exhentai;

export const getLastestListFileName = () => {
  const infoPath = joinWithRootPath(listInfoPath);
  const infoFiles = fs.readdirSync(infoPath);

  if (infoFiles.length > 0) {
    const result = infoFiles
      .filter((item: string) => item !== '.gitkeep')
      .map((item: string) => parseInt(item, 10))
      .sort((a: any, b: any) => b - a);
    if (result.length > 0) {
      return result[0].toString();
    }
    return null;
  }
  return null;
};

export const getListFiles = (): string[] => {
  const infoPath = joinWithRootPath(listInfoPath);
  const infoFiles = fs.readdirSync(infoPath);

  if (infoFiles.length > 0) {
    return infoFiles
      .filter((item: string) => item !== '.gitkeep')
      .map((item: string) => item.replace('.json', ''));
  }
  return [];
};

export const getLastestListInfo = () => {
  const tempPath = getLastestListFileName() || '';
  const newestListFilePath = joinWithRootPath(listInfoPath + tempPath);
  const result = readJsonFile(newestListFilePath + '.json');
  return result && result[0];
};

export const getBaseNameOfImage = (dir: string) =>
  fs
    .readdirSync(joinWithRootPath(dir))
    .filter(f => path.extname(f) !== 'json')
    .map(f => path.basename(f, '.jpg'));
