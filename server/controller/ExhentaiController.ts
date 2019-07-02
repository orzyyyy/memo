import { success, info } from '../utils/log';
import { Controller, Request } from '../utils/decorator';
import { writeIntoJsonFile, getTimeStamp } from '../utils/common';
import ExhentaiService from '../service/ExhentaiService';
import { getLastestListInfo, getLastestListFileName } from '../utils/exhentai';

export interface ExHentaiInfoItem {
  name: string;
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
    const lastestListInfo = await getLastestListInfo();
    const results = await service.fetchListInfo(lastestListInfo);
    const createTime = getTimeStamp();
    writeIntoJsonFile(`src/assets/exhentai/${createTime}`, results);
    success('fetch completed.');
    ctx.response.body = `./assets/exhentai/${createTime}.json`;
  }

  @Request({ url: '/getLastestSet', method: 'get' })
  async getLastestExHentaiSet(ctx: any) {
    ctx.response.body = `./assets/exhentai/${getLastestListFileName()}.json`;
  }

  @Request({ url: '/download', method: 'post' })
  async downloadImages(ctx: any) {
    const { url } = ctx.request.body;
    const service = new ExhentaiService();
    await service.initBrowser();
    await service.gotoTargetPage(url);
    const prefixPath = await service.ensureFolderForSave();

    info(`start fetching thumbnai urls from: ${url}`);

    const thumbnailUrls = await service.getThumbnaiUrlFromDetailPage();
    writeIntoJsonFile(`${prefixPath}/restDetailUrls`, thumbnailUrls);

    info(`start fetching target images`);

    const images = await service.fetchTargetImageUrls(thumbnailUrls);

    success('fetch all image urls');

    writeIntoJsonFile(`${prefixPath}/detailImageUrls`, images);

    await service.downImages(images, prefixPath);

    success('download completed');

    ctx.response.body = true;
  }
}
