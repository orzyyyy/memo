import { joinWithRootPath, readJsonFile } from './common';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import glob from 'glob';
import { getTargetResource } from './resource';
import { trace, error, success } from './log';
import request from 'request';

const isWin = process.platform === 'win32';
const { winProxy, linuxProxy, requestTime } = getTargetResource(
  'server',
).exhentai;
request.defaults({
  proxy: isWin ? winProxy : linuxProxy,
});

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
  const result: {
    detail: string;
    index: string;
    i: number;
    name: string;
  }[] = [];
  const latestDir = fs.readdirSync(latestDirPath);
  for (const item of latestDir) {
    const prefix = `${latestDirPath}/${item}`;
    if (!fs.existsSync(`${prefix}/detailImageUrls.json`)) {
      break;
    }
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
          name: item,
        });
      }
    }
  }
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

export function handleDownloadStream(
  imageUrl: string[],
  i: number,
  counter: number[],
  prefixPath: string,
) {
  const item = imageUrl[i];
  const pageIndex = i + 1;
  const targetUrl = joinWithRootPath(`${prefixPath}/${pageIndex}.jpg`);
  fs.ensureFileSync(targetUrl);
  trace('download begin: ' + item);
  const imageStream = fs.createWriteStream(targetUrl);
  const timer = Date.now();
  let status = true;
  request(item)
    .on('data', function() {
      const newTimer = Date.now();
      if (
        newTimer - timer >= requestTime &&
        fs.existsSync(targetUrl) &&
        status
      ) {
        imageStream.close();
        trace(`unlink: ${pageIndex}.jpg`);
        error('time out at page index: ' + pageIndex);
        status = false;
      }
    })
    .on('error', function() {
      error('unexpected error occar, will re-request later');
      fs.unlinkSync(targetUrl);
      trace(`unlink: ${pageIndex}.jpg`);
      handleDownloadStream(imageUrl, i, counter, prefixPath);
    })
    .pipe(
      imageStream.on('finish', function() {
        if (status) {
          counter.push(pageIndex);
          success(`${pageIndex}.jpg ${counter.length}/${imageUrl.length}`);
          if (counter.length === imageUrl.length) {
            success('download completed');
          }
        } else {
          fs.unlinkSync(targetUrl);
          handleDownloadStream(imageUrl, i, counter, prefixPath);
        }
      }),
    );
}
