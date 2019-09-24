import { success, info } from '../utils/log';
import { Controller, Request } from '../utils/decorator';
import {
  writeIntoJsonFile,
  getTimeStamp,
  readJsonFile,
  joinWithRootPath,
} from '../utils/common';
import ExhentaiService from '../service/ExhentaiService';
import {
  getLatestListInfo,
  getLatestListFileName,
  getBaseNameOfImage,
  getListFiles,
  getEmptyRestDetailUrlInfo,
} from '../utils/exhentai';
import path from 'path';
import { Context } from 'koa';

export interface ExHentaiInfoItem {
  name?: string;
  detailUrl: string;
  postTime: number;
  thumbnailUrl: string;
}

@Controller('/exhentai')
export default class ExhentaiController {
  @Request({ url: '/', method: 'get' })
  async getThumbnaiInfo() {
    const service = new ExhentaiService();
    await service.initBrowser();
    const latestListInfo = await getLatestListInfo();
    const results = await service.fetchListInfo(latestListInfo);
    const createTime = getTimeStamp();
    [
      `src/assets/exhentai/${createTime}`,
      `dist/assets/exhentai/${createTime}`,
    ].map(item => writeIntoJsonFile(item, results));
    success('fetch completed');
    return `./assets/exhentai/${createTime}.json`;
  }

  @Request({ url: '/getLatestSet', method: 'get' })
  async getLatestExHentaiSet() {
    return `./assets/exhentai/${getLatestListFileName()}.json`;
  }

  @Request({ url: '/download', method: 'post' })
  async downloadImages(ctx: Context) {
    const { url } = ctx.request.body;
    const service = new ExhentaiService();
    await service.initBrowser();
    await service.gotoTargetPage(url, true);
    const prefixPath = await service.ensureFolderForSave();

    info(`start fetching thumbnai urls from: ${url}`);

    const restDetailUrls: string[] = [
      url,
      ...(await service.getUrlFromPaginationInfo()),
    ];
    const thumbnailUrls = await service.getThumbnailUrlFromDetailPage(
      restDetailUrls,
    );
    writeIntoJsonFile(`${prefixPath}/restDetailUrls`, thumbnailUrls);

    info(`start fetching target images`);

    const images = await service.fetchImageUrls(thumbnailUrls);

    success('fetch all image completed');

    writeIntoJsonFile(`${prefixPath}/detailImageUrls`, images);

    await service.downloadImages(images, prefixPath);
  }

  @Request({ url: '/download/target', method: 'get' })
  async downloadFromExistUrls(ctx: Context) {
    const { name, dateStamp } = ctx.query;
    const service = new ExhentaiService();
    const prefixPath = `exhentai/${dateStamp}/${name}`;
    const detailImageUrls = readJsonFile(
      joinWithRootPath(`${prefixPath}/detailImageUrls.json`),
    );
    service.downloadImages(detailImageUrls, prefixPath);
  }

  @Request({ url: '/download/stat', method: 'get' })
  async statisticsFailedDownloadImgUrls(ctx: Context) {
    const { name, dateStamp } = ctx.query;
    const prefixPath = `exhentai/${dateStamp}/${name}`;
    const detailImageUrls: string[] = readJsonFile(
      joinWithRootPath(`${prefixPath}/detailImageUrls.json`),
    );
    const indexImageUrls: string[] = readJsonFile(
      joinWithRootPath(`${prefixPath}/restDetailUrls.json`),
    );
    const imgUrls: string[] = getBaseNameOfImage(prefixPath);
    const result: { detail: string; index: string; i: number }[] = [];
    for (let i = 1; i < indexImageUrls.length + 1; i++) {
      if (!imgUrls.includes(i.toString())) {
        result.push({
          detail: detailImageUrls[i - 1],
          i,
          index: indexImageUrls[i - 1],
        });
      }
    }
    return result;
  }

  @Request({ url: '/dateSet', method: 'get' })
  async getDateSet() {
    const listFiles = getListFiles().reverse();
    const result: { key: string; name: string }[] = [];

    for (const item of listFiles) {
      result.push({ key: `./assets/exhentai/${item}.json`, name: item });
    }

    return listFiles;
  }

  @Request({ url: '/sync', method: 'get' })
  async sync() {
    const service = new ExhentaiService();
    await service.initBrowser();
    const targetComic = getEmptyRestDetailUrlInfo();
    for (const jsonUrl of targetComic) {
      const thumbnailUrls = readJsonFile(jsonUrl);
      info(`start fetching target images`);

      const images = await service.fetchImageUrls(thumbnailUrls);
      await service.downloadImages(images, path.dirname(jsonUrl));

      success('fetch all image completed');
    }
  }
}
