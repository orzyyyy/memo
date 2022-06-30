import { Controller, Request } from '../utils/decorator';
import { writeIntoJsonFile, getTimeStamp, readJsonFile, joinWithRootPath } from '../utils/common';
import ExhentaiService from '../service/ExhentaiService';
import {
  getListInfo,
  getListFileName,
  getListFiles,
  getLatestDownloadDirName,
  getMissedImgInfo,
} from '../utils/exhentai';
import { Context } from 'koa';
import { getLogger } from '..';
const logger = getLogger('server/controller/ExhentaiController.ts');

export interface ExHentaiInfoItem {
  name?: string;
  detailUrl: string;
  postTime: number;
  thumbnailUrl: string;
}

@Controller('/exhentai')
export default class ExhentaiController {
  constructor(private service: ExhentaiService) {
    this.service = new ExhentaiService();
  }

  @Request({ url: '/list/latest', method: 'get' })
  async getThumbnaiInfo() {
    const service = this.service;
    await service.initBrowser();
    const listInfo = await getListInfo('latest');
    const results = await service.fetchListInfo(listInfo);
    const createTime = getTimeStamp();
    [`src/assets/exhentai/${createTime}`, `dist/assets/exhentai/${createTime}`].map(item =>
      writeIntoJsonFile(item, results),
    );
    logger.info('fetch completed');
    return `./assets/exhentai/${createTime}.json`;
  }

  @Request({ url: '/getLatestSet', method: 'get' })
  async getLatestExHentaiSet() {
    return `./assets/exhentai/${getListFileName('latest')}.json`;
  }

  @Request({ url: '/download', method: 'post' })
  async downloadImages(ctx: any) {
    const { url } = ctx.request.body;
    const service = this.service;
    await service.initBrowser();
    await service.gotoTargetPage(url, true);
    const prefixPath = await service.ensureFolderForSave();

    logger.info(`start fetching thumbnai urls from: ${url}`);

    const urlArr = (await service.getUrlFromPaginationInfo()) as string[];
    const list: string[] = [url, ...urlArr];
    const thumbnailUrls = await service.getThumbnailUrlFromDetailPage(list);
    writeIntoJsonFile(`${prefixPath}/list`, thumbnailUrls);

    logger.info('start fetching target images');

    const images = await service.fetchImageUrls(thumbnailUrls);

    logger.info('fetch all image completed');

    writeIntoJsonFile(`${prefixPath}/detail`, images);

    await service.downloadImages(images, prefixPath);
  }

  @Request({ url: '/download/target', method: 'get' })
  async downloadFromExistUrls(ctx: Context) {
    const { name, dateStamp } = ctx.query;
    const service = this.service;
    const prefixPath = `exhentai/${dateStamp}/${name}`;
    const detail = readJsonFile(joinWithRootPath(`${prefixPath}/detail.json`));
    service.downloadImages(detail, prefixPath);
  }

  @Request({ url: '/download/status', method: 'get' })
  async checkMissedDownloadImgs(ctx: Context) {
    const { dateStamp } = ctx.query;
    const latestDirName = getLatestDownloadDirName(dateStamp);
    const latestDirPath = joinWithRootPath(`exhentai/${latestDirName}`);
    const result = getMissedImgInfo(latestDirPath);
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
}
