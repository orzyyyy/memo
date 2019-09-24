import { joinWithRootPath, readJsonFile } from './common';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import glob from 'glob';
import { getTargetResource } from './resource';

const { listInfoPath, downloadPath } = getTargetResource('server').exhentai;

export const getLatestListFileName = () => {
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

export const getLatestListInfo = () => {
  const tempPath = getLatestListFileName() || '';
  const newestListFilePath = joinWithRootPath(listInfoPath + tempPath);
  const result = readJsonFile(newestListFilePath + '.json');
  return result && result[0];
};

export const getBaseNameOfImage = (dir: string) =>
  fs.readdirSync(joinWithRootPath(dir)).map(f => f.replace(/[.jpg|.png]/g, ''));

export const getEmptyRestDetailUrlInfo = () =>
  glob
    .sync(joinWithRootPath(downloadPath) + '/**/restDetailUrls.json')
    .filter(item => {
      const dirName = dirname(item);
      if (!fs.existsSync(join(dirName, 'detailImageUrls.json'))) {
        return true;
      }
      return false;
    });
