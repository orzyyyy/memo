import { getTargetResource } from '../utils/resource';
import fs from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { format } from 'date-fns';
import request from 'request-promise';
import { success, info, trace, error } from '../utils/log';
import { Controller, Request } from '../utils/decorator';

const { exHentai: exHentaiCookie } = getTargetResource('cookie');
const { exHentai } = getTargetResource('server');

export interface ExHentaiInfoItem {
  name: string;
  detailUrl: string;
  postTime: number;
  thumbnailUrl: string;
}

@Controller('/exhentai')
export default class ExhentaiController {
  setExHentaiCookie = async (page: any) => {
    for (const item of exHentaiCookie) {
      await page.setCookie(item);
    }
  };

  getExHentaiInfo = async ({
    pageIndex,
    page,
  }: {
    pageIndex: number;
    page: any;
  }) => {
    await page.goto('https://www.google.com/', {
      waitUntil: 'domcontentloaded',
    });
    await page.goto(exHentai.href + pageIndex, {
      waitUntil: 'domcontentloaded',
    });
    const exHentaiInfo = await page.$$eval(
      'div.gl1t',
      (wrappers: any[]) =>
        new Promise(resolve => {
          const results: ExHentaiInfoItem[] = [];
          for (const item of wrappers) {
            const tempPostTime = item.lastChild.innerText.replace(
              /[^0-9]/gi,
              '',
            );
            const year = tempPostTime.substring(0, 4);
            const month = tempPostTime.substring(5, 6) - 1;
            const day = tempPostTime.substring(7, 8);
            const hour = tempPostTime.substring(9, 10);
            const minute = tempPostTime.substring(11, 12);

            const postTime = new Date(year, month, day, hour, minute).getTime();
            results.push({
              name: item.firstChild.innerText,
              detailUrl: item.firstChild.href,
              postTime,
              thumbnailUrl: item.childNodes[1].firstChild.firstChild.src,
            });
          }
          resolve(results);
        }),
    );
    return exHentaiInfo;
  };

  launchExHentaiPage = async () => {
    const browser = await puppeteer.launch({
      executablePath: exHentai.executablePath,
      args: exHentai.launchArgs,
      devtools: exHentai.devtools,
    });
    success('launch puppeteer');
    const page = await browser.newPage();
    this.setExHentaiCookie(page);
    success('set cookie');
    return { page, browser };
  };

  getLastestFileName = () => {
    const exHentaiInfoPath = path.join(process.cwd(), './src/assets/exhentai/');
    const exHentaiInfoFiles = fs
      .readdirSync(exHentaiInfoPath)
      .filter((item: string) => item !== '.gitkeep')
      .map((item: string) => parseInt(item, 10));
    return exHentaiInfoFiles.sort((a: any, b: any) => b - a);
  };

  @Request({ url: '/', method: 'get' })
  async getExhentai(ctx: any) {
    const { page, browser } = await this.launchExHentaiPage();
    let results: ExHentaiInfoItem[] = [];
    const lastestFileName = this.getLastestFileName()[0];
    const lastestFilePath = path.join(
      process.cwd(),
      `src/assets/exhentai/${lastestFileName}.json`,
    );
    const { postTime } = JSON.parse(
      fs.readFileSync(lastestFilePath).toString(),
    )[0];
    for (let i = 0; i < exHentai.maxPageIndex; i++) {
      info(`fetching pageIndex => ${i + 1}`);
      const result = await this.getExHentaiInfo({ pageIndex: i, page });
      results = [...results, ...result];
      // compare lastest date of comic, break when current comic has been fetched
      if (result.length > 0) {
        if (result[result.length - 1].postTime < postTime) {
          break;
        }
      }

      await page.waitFor(exHentai.waitTime);
    }
    await browser.close();

    trace('write into json');
    const createTime = format(new Date(), 'yyyyMMddHHmmss');
    fs.outputJSON(
      path.join(process.cwd(), `src/assets/exhentai/${createTime}.json`),
      results,
    ).catch((err: any) => {
      error('write into json' + err);
    });
    success('write into json');

    ctx.response.body = `./assets/${createTime}.json`;
  }

  @Request({ url: '/getLastestSet', method: 'get' })
  async getLastestExHentaiSet(ctx: any) {
    ctx.response.body = `./assets/exhentai/${
      this.getLastestFileName()[0]
    }.json`;
  }

  getAllThumbnaiUrls = async (page: any) =>
    await page.$$eval(
      exHentai.thumbnailClass,
      (wrappers: any[]) =>
        new Promise(resolve => {
          const result: any[] = [];
          for (const item of wrappers) {
            result.push(item.href);
          }
          resolve(result);
        }),
    );

  getUrlFromPaginationInfo = async (page: any) =>
    await page.$$eval(
      'table.ptt a',
      (wrappers: any[]) =>
        new Promise(resolve => {
          if (wrappers.length !== 1) {
            const result: string[] = [];
            wrappers.pop();
            wrappers.shift();
            for (const item of wrappers) {
              result.push(item.href);
            }
            resolve(result);
          } else {
            resolve([]);
          }
        }),
    );

  @Request({ url: '/download', method: 'post' })
  async downloadImages(ctx: any) {
    const { url, name } = ctx.request.body;
    const subName = name.replace(
      /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/gim,
      '',
    );
    info(`download from: ${url}`);
    const { page, browser } = await this.launchExHentaiPage();
    await page.goto('https://www.google.com/', {
      waitUntil: 'domcontentloaded',
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // prepare for download
    const datePath = format(new Date(), 'yyyyMMdd');
    fs.ensureDirSync(
      path.join(
        process.cwd(),
        `${exHentai.downloadPath}/${datePath}/${subName}`,
      ),
    );

    const restDetailUrls = await this.getUrlFromPaginationInfo(page);
    const firstPageThumbnailUrls = await this.getAllThumbnaiUrls(page);
    await page.waitFor(exHentai.waitTime);

    for (const item of restDetailUrls) {
      await page.goto('https://www.google.com/', {
        waitUntil: 'domcontentloaded',
      });
      await page.goto(item, { waitUntil: 'domcontentloaded' });
      const thumbnailUrlsFromNextPage = await this.getAllThumbnaiUrls(page);
      firstPageThumbnailUrls.push(...thumbnailUrlsFromNextPage);
      info('image length: ' + firstPageThumbnailUrls.length);
      await page.waitFor(exHentai.waitTime);
    }

    const images = [];
    const targetImgUrls = firstPageThumbnailUrls;
    // get thumbnail url in detail page
    for (let i = 0; i < targetImgUrls.length; i++) {
      await page.goto('https://www.google.com/', {
        waitUntil: 'domcontentloaded',
      });
      await page.goto(targetImgUrls[i], { waitUntil: 'domcontentloaded' });
      info(`fetching image url => ${targetImgUrls[i]}`);
      const imgUrl = await page.$eval(
        '[id=i3] img',
        (target: any) =>
          new Promise(resolve => {
            resolve(target.src);
          }),
      );
      images.push(imgUrl);
      await page.waitFor(exHentai.waitTime);
    }
    success('fetch all images');
    // save image url into file, for unexpect error
    fs.outputJSON(
      path.join(
        process.cwd(),
        `${exHentai.downloadPath}/${datePath}/${subName}/restDetailUrls.json`,
      ),
      targetImgUrls,
    ).catch((err: any) => {
      error('write into json' + err);
    });
    fs.outputJSON(
      path.join(
        process.cwd(),
        `${exHentai.downloadPath}/${datePath}/${subName}/detailImageUrls.json`,
      ),
      images,
    ).catch((err: any) => {
      error('write into json' + err);
    });

    // fetch and save images
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      trace('download begin: ' + item);
      await request
        .get({ url: item, proxy: exHentai.proxy } as {
          url: string;
          proxy: string;
        })
        .on('error', (err: any) => {
          error(err + ' => ' + item);
        })
        .pipe(
          fs
            .createWriteStream(
              path.join(
                process.cwd(),
                `${exHentai.downloadPath}/${datePath}/${subName}/${i + 1}.jpg`,
              ),
            )
            .on('finish', () => success(`${i + 1}.jpg`))
            .on('error', (err: any) =>
              error(`${subName}-${i + 1}.jpg failed, ${err}`),
            ),
        );
      if (i % 4 === 0) {
        await page.waitFor(exHentai.waitTime);
      }
    }
    await browser.close();
    ctx.response.body = true;
  }
}
