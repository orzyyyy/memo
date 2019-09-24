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
      .sort((a: number, b: number) => b - a);
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

export const getLatestDownloadDirName = (dateStamp?: string) => {
  let result = dateStamp;
  if (!dateStamp) {
    const downloadDir = fs
      .readdirSync(joinWithRootPath(downloadPath))
      .filter((item: string) => item !== '.gitkeep');
    result = downloadDir[downloadDir.length - 1];
  }
  return result;
};

export const getMissedImgInfo = (latestDirPath: string) => {
  const result: { detail: string; index: string; i: number }[] = [];
  fs.readdirSync(latestDirPath).map(item => {
    const prefix = `${latestDirPath}/${item}`;
    const files = fs
      .readdirSync(prefix)
      .map(f => parseInt(f.replace(/[.jpg|.png]/g, '')))
      .filter(item => item)
      .sort((a: number, b: number) => a - b)
      .map(item => item.toString());
    const detail: string[] = readJsonFile(`${prefix}/detailImageUrls.json`);
    const rest: string[] = readJsonFile(`${prefix}/restDetailUrls.json`);

    for (let i = 1; i < rest.length + 1; i++) {
      if (!files.includes(i.toString())) {
        result.push({
          detail: detail[i - 1],
          i,
          index: rest[i - 1],
        });
      }
    }
  });
  return result;
};

export const getLatestListInfo = () => {
  const tempPath = getLatestListFileName() || '';
  const newestListFilePath = joinWithRootPath(listInfoPath + tempPath);
  const result = readJsonFile(newestListFilePath + '.json');
  return result && result[0];
};

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
