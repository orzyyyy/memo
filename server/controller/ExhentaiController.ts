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
} from '../utils/exhentai';

export interface ExHentaiInfoItem {
  name?: string;
  detailUrl: string;
  postTime: number;
  thumbnailUrl: string;
}

@Controller('/exhentai')
export default class ExhentaiController {
  @Request({ url: '/', method: 'get' })
  async getThumbnaiInfo(ctx: { response: { body: string } }) {
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
    ctx.response.body = `./assets/exhentai/${createTime}.json`;
  }

  @Request({ url: '/getLatestSet', method: 'get' })
  async getLatestExHentaiSet(ctx: any) {
    ctx.response.body = `./assets/exhentai/${getLatestListFileName()}.json`;
  }

  @Request({ url: '/download', method: 'post' })
  async downloadImages(ctx: any) {
    const { url } = ctx.request.body;
    const service = new ExhentaiService();
    await service.initBrowser();
    await service.gotoTargetPage(url, true);
    const prefixPath = await service.ensureFolderForSave();

    info(`start fetching thumbnai urls from: ${url}`);

    const thumbnailUrls = await service.getThumbnaiUrlFromDetailPage();
    writeIntoJsonFile(`${prefixPath}/restDetailUrls`, thumbnailUrls);

    info(`start fetching target images`);

    const images = await service.fetchImageUrls(thumbnailUrls);

    success('fetch all image urls');

    writeIntoJsonFile(`${prefixPath}/detailImageUrls`, images);

    await service.downloadImages(images, prefixPath);

    ctx.response.body = true;
  }

  @Request({ url: '/download/target', method: 'get' })
  async downloadFromExistUrls(ctx: any) {
    const { name, dateStamp } = ctx.query;
    const service = new ExhentaiService();
    const prefixPath = `exhentai/${dateStamp}/${name}`;
    const detailImageUrls = readJsonFile(
      joinWithRootPath(`${prefixPath}/detailImageUrls.json`),
    );
    service.downloadImages(detailImageUrls, prefixPath);
    ctx.response.body = true;
  }

  @Request({ url: '/download/stat', method: 'get' })
  async statisticsFailedDownloadImgUrls(ctx: any) {
    const { name, dateStamp, length } = ctx.query;
    const prefixPath = `exhentai/${dateStamp}/${name}`;
    const detailImageUrls: string[] = readJsonFile(
      joinWithRootPath(`${prefixPath}/detailImageUrls.json`),
    );
    const indexImageUrls: string[] = readJsonFile(
      joinWithRootPath(`${prefixPath}/restDetailUrls.json`),
    );
    const imgUrls: string[] = getBaseNameOfImage(prefixPath);
    const result: { detail: string; index: string; i: number }[] = [];
    for (let i = 1; i < parseInt(length, 10) + 1; i++) {
      if (!imgUrls.includes(i.toString())) {
        result.push({
          detail: detailImageUrls[i - 1],
          i,
          index: indexImageUrls[i - 1],
        });
      }
    }
    ctx.response.body = result;
  }

  @Request({ url: '/dateSet', method: 'get' })
  async getDateSet(ctx: any) {
    const listFiles = getListFiles().reverse();
    const result: { key: string; name: string }[] = [];

    for (const item of listFiles) {
      result.push({ key: `./assets/exhentai/${item}.json`, name: item });
    }

    ctx.response.body = listFiles;
  }
}
