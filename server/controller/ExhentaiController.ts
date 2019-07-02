// import fs from 'fs-extra';
// import path from 'path';
// import { format } from 'date-fns';
// import request from 'request-promise';
import { success } from '../utils/log';
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

// const getAllThumbnaiUrls = async (page: any) =>
//   await page.$$eval(
//     exHentai.thumbnailClass,
//     (wrappers: any[]) =>
//       new Promise(resolve => {
//         const result: any[] = [];
//         for (const item of wrappers) {
//           result.push(item.href);
//         }
//         resolve(result);
//       }),
//   );

// const getUrlFromPaginationInfo = async (page: any) =>
//   await page.$$eval(
//     'table.ptt a',
//     (wrappers: any[]) =>
//       new Promise(resolve => {
//         if (wrappers.length !== 1) {
//           const result: string[] = [];
//           wrappers.pop();
//           wrappers.shift();
//           for (const item of wrappers) {
//             result.push(item.href);
//           }
//           resolve(result);
//         } else {
//           resolve([]);
//         }
//       }),
//   );

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

  // @Request({ url: '/download', method: 'post' })
  // async downloadImages(ctx: any) {
  //   const { url, name } = ctx.request.body;
  //   const subName = name.replace(
  //     /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/gim,
  //     '',
  //   );
  //   info(`download from: ${url}`);
  //   const { page, browser } = await launchExHentaiPage();
  //   await page.goto('https://www.google.com/', {
  //     waitUntil: 'domcontentloaded',
  //   });
  //   await page.goto(url, { waitUntil: 'domcontentloaded' });

  //   // prepare for download
  //   const datePath = format(new Date(), 'yyyyMMdd');
  //   fs.ensureDirSync(
  //     path.join(
  //       process.cwd(),
  //       `${exHentai.downloadPath}/${datePath}/${subName}`,
  //     ),
  //   );

  //   const restDetailUrls = await getUrlFromPaginationInfo(page);
  //   const firstPageThumbnailUrls = await getAllThumbnaiUrls(page);
  //   await page.waitFor(exHentai.waitTime);

  //   for (const item of restDetailUrls) {
  //     await page.goto('https://www.google.com/', {
  //       waitUntil: 'domcontentloaded',
  //     });
  //     await page.goto(item, { waitUntil: 'domcontentloaded' });
  //     const thumbnailUrlsFromNextPage = await getAllThumbnaiUrls(page);
  //     firstPageThumbnailUrls.push(...thumbnailUrlsFromNextPage);
  //     info('image length: ' + firstPageThumbnailUrls.length);
  //     await page.waitFor(exHentai.waitTime);
  //   }

  //   const images = [];
  //   const targetImgUrls = firstPageThumbnailUrls;
  //   // get thumbnail url in detail page
  //   for (let i = 0; i < targetImgUrls.length; i++) {
  //     await page.goto('https://www.google.com/', {
  //       waitUntil: 'domcontentloaded',
  //     });
  //     await page.goto(targetImgUrls[i], { waitUntil: 'domcontentloaded' });
  //     info(`fetching image url => ${targetImgUrls[i]}`);
  //     const imgUrl = await page.$eval(
  //       '[id=i3] img',
  //       (target: any) =>
  //         new Promise(resolve => {
  //           resolve(target.src);
  //         }),
  //     );
  //     images.push(imgUrl);
  //     await page.waitFor(exHentai.waitTime);
  //   }
  //   success('fetch all images');
  //   // save image url into file, for unexpect error
  //   fs.outputJSON(
  //     path.join(
  //       process.cwd(),
  //       `${exHentai.downloadPath}/${datePath}/${subName}/restDetailUrls.json`,
  //     ),
  //     targetImgUrls,
  //   ).catch((err: any) => {
  //     error('write into json' + err);
  //   });
  //   fs.outputJSON(
  //     path.join(
  //       process.cwd(),
  //       `${exHentai.downloadPath}/${datePath}/${subName}/detailImageUrls.json`,
  //     ),
  //     images,
  //   ).catch((err: any) => {
  //     error('write into json' + err);
  //   });

  //   // fetch and save images
  //   for (let i = 0; i < images.length; i++) {
  //     const item = images[i];
  //     trace('download begin: ' + item);
  //     await request
  //       .get({ url: item, proxy: exHentai.proxy } as {
  //         url: string;
  //         proxy: string;
  //       })
  //       .on('error', (err: any) => {
  //         error(err + ' => ' + item);
  //       })
  //       .pipe(
  //         fs
  //           .createWriteStream(
  //             path.join(
  //               process.cwd(),
  //               `${exHentai.downloadPath}/${datePath}/${subName}/${i + 1}.jpg`,
  //             ),
  //           )
  //           .on('finish', () => success(`${i + 1}.jpg`))
  //           .on('error', (err: any) =>
  //             error(`${subName}-${i + 1}.jpg failed, ${err}`),
  //           ),
  //       );
  //     if (i % 4 === 0) {
  //       await page.waitFor(exHentai.waitTime);
  //     }
  //   }
  //   await browser.close();
  //   ctx.response.body = true;
  // }
}
