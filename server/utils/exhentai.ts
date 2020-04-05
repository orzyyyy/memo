import { joinWithRootPath, readJsonFile } from './common';
import fs from 'fs-extra';
import { getTargetResource } from './resource';
import request from 'request';
import { getLogger } from '..';
const logger = getLogger('server/utils/exhentai.ts');

export type ListProps = 'oldest' | 'latest';

const isWin = process.platform === 'win32';
const { winProxy, linuxProxy, requestTime } = getTargetResource('server').exhentai;
request.defaults({
  proxy: isWin ? winProxy : linuxProxy,
});

const { listInfoPath, downloadPath } = getTargetResource('server').exhentai;

export const getListFileName = (flag: ListProps) => {
  const infoPath = joinWithRootPath(listInfoPath);
  const infoFiles = fs.readdirSync(infoPath);

  if (infoFiles.length > 0) {
    const result = infoFiles
      .filter((item: string) => item !== '.gitkeep')
      .map((item: string) => parseInt(item, 10))
      .sort((a: number, b: number) => b - a);
    if (result.length > 0) {
      const index = flag === 'latest' ? 0 : result.length - 1;
      return result[index].toString();
    }
    return null;
  }
  return null;
};

export const getListFiles = (): string[] => {
  const infoPath = joinWithRootPath(listInfoPath);
  const infoFiles = fs.readdirSync(infoPath);

  if (infoFiles.length > 0) {
    return infoFiles.filter((item: string) => item !== '.gitkeep').map((item: string) => item.replace('.json', ''));
  }
  return [];
};

export const getLatestDownloadDirName = (dateStamp?: string) => {
  let result = dateStamp;
  if (!dateStamp) {
    const downloadDir = fs.readdirSync(joinWithRootPath(downloadPath)).filter((item: string) => item !== '.gitkeep');
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
    if (!fs.existsSync(`${prefix}/detail.json`)) {
      break;
    }
    const files = fs
      .readdirSync(prefix)
      .map(f => parseInt(f.replace(/[.jpg|.png]/g, '')))
      .filter(item => item)
      .sort((a: number, b: number) => a - b)
      .map(item => item.toString());
    const detail: string[] = readJsonFile(`${prefix}/detail.json`);
    const rest: string[] = readJsonFile(`${prefix}/list.json`);

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

export const getListInfo = (flag: ListProps) => {
  const tempPath = getListFileName(flag);
  const newestListFilePath = joinWithRootPath(listInfoPath + tempPath);
  const result = readJsonFile(newestListFilePath + '.json');
  return result && result[0];
};

export function handleDownloadStream(imageUrl: string[], i: number, counter: number[], prefixPath: string) {
  const item = imageUrl[i];
  const pageIndex = i + 1;
  const targetUrl = joinWithRootPath(`${prefixPath}/${pageIndex}.jpg`);
  fs.ensureFileSync(targetUrl);
  logger.trace('download begin: ' + item);
  const imageStream = fs.createWriteStream(targetUrl);
  const timer = Date.now();
  let status = true;

  request(item)
    .on('data', function () {
      const newTimer = Date.now();
      if (newTimer - timer >= requestTime && fs.existsSync(targetUrl) && status) {
        imageStream.close();
        logger.trace(`unlink: ${pageIndex}.jpg`);
        logger.error('time out at page index: ' + pageIndex);
        status = false;
      }
    })
    .on('error', function (err) {
      logger.error(err);
      fs.unlinkSync(targetUrl);
      logger.trace(`unlink: ${pageIndex}.jpg`);
      handleDownloadStream(imageUrl, i, counter, prefixPath);
    })
    .pipe(
      imageStream.on('finish', function () {
        if (status) {
          counter.push(pageIndex);
          logger.info(`${pageIndex}.jpg ${counter.length}/${imageUrl.length}`);
          if (counter.length === imageUrl.length) {
            logger.info('download completed');
          }
        } else {
          fs.unlinkSync(targetUrl);
          handleDownloadStream(imageUrl, i, counter, prefixPath);
        }
      }),
    );
}
