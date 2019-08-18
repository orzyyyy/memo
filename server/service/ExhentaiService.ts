import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';
import request from 'request-promise';
import { success, info, error, trace } from '../utils/log';
import { getTargetResource } from '../utils/resource';
import { ExHentaiInfoItem } from '../controller/ExhentaiController';
import { joinWithRootPath, getDateStamp } from '../utils/common';

export default class ExhentaiService {
  cookie: any[];
  config: any;
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  isWin: boolean;

  constructor() {
    this.cookie = getTargetResource('cookie').exhentai;
    this.config = getTargetResource('server').exhentai;
    const isWin = process.platform === 'win32';
    this.isWin = isWin;
    request.defaults({
      proxy: isWin ? this.config.winProxy : this.config.linuxProxy,
    });
  }

  setExHentaiCookie = async () => {
    for (const item of this.cookie) {
      await this.page.setCookie(item);
    }
  };

  initBrowser = async () => {
    const {
      winChromePath,
      linuxChromePath,
      winLaunchArgs,
      linuxLaunchArgs,
      headless,
    } = this.config;
    const executablePath = this.isWin ? winChromePath : linuxChromePath;
    const launchArgs = this.isWin ? winLaunchArgs : linuxLaunchArgs;
    const browser = await puppeteer.launch({
      executablePath,
      args: launchArgs,
      headless,
    });
    this.browser = browser;

    success('launch puppeteer');

    const page = await browser.newPage();
    this.page = page;

    this.setExHentaiCookie();

    success('set cookie');

    return { page, browser };
  };

  gotoTargetPage = async (url: string, isFirstPage?: boolean) => {
    if (isFirstPage) {
      await this.page.goto('https://www.baidu.com/', {
        waitUntil: 'domcontentloaded',
      });
    }
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  };

  getComicName = async () => {
    const name: any = await this.page.$eval(
      '#gj',
      (target: any) => new Promise(resolve => resolve(target.innerText)),
    );
    return name
      .replace(/[!@#$%^&*·！#￥（——）：；“”‘、，|《。》？、【】[\]]/gim, '')
      .replace(/\s+/g, '');
  };

  ensureFolderForSave = async () => {
    const subName = await this.getComicName();
    const datePath = getDateStamp();
    const prefixPath = `${this.config.downloadPath}/${datePath}/${subName}`;
    const folderToSaveImages = joinWithRootPath(prefixPath);
    fs.ensureDirSync(folderToSaveImages);

    success(`check ${prefixPath} for saving images`);

    return prefixPath;
  };

  getListInfo = async ({ pageIndex }: { pageIndex: number }) => {
    await this.gotoTargetPage(this.config.href + pageIndex, true);
    const exHentaiInfo: ExHentaiInfoItem[] = await this.page.$$eval(
      'div.gl1t',
      (wrappers: any[]) =>
        new Promise(resolve => {
          const results: ExHentaiInfoItem[] = [];
          for (const item of wrappers) {
            const originDate = item.lastChild.innerText
              .replace(/[^0-9]/gi, '')
              .substring(0, 12);
            const year = originDate.substring(0, 4);
            const month = originDate.substring(4, 6) - 1;
            const day = originDate.substring(6, 8);
            const hour = originDate.substring(8, 10);
            const minute = originDate.substring(10, 12);
            const postTime = new Date(year, month, day, hour, minute).getTime();
            results.push({
              // name: item.firstChild.innerText,
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

  fetchListInfo = async ({ postTime }: ExHentaiInfoItem) => {
    let results: ExHentaiInfoItem[] = [];
    const { maxPageIndex, waitTime } = this.config;
    for (let i = 0; i < maxPageIndex; i++) {
      const pageIndex = i + 1;
      info(`fetching pageIndex => ${pageIndex}`);

      const result = await this.getListInfo({ pageIndex: i });
      results = [...results, ...result];
      // compare latest date of comic, break when current comic has been fetched
      if (result.length > 0) {
        const currentItem = result[result.length - 1];
        if (currentItem.postTime < postTime) {
          info(
            `get newest page now => ${pageIndex}, name is ${currentItem.name}`,
          );
          info(`thumbnailUrl is ${currentItem.thumbnailUrl}`);
          break;
        }
      }

      success(`fetch completed => ${pageIndex}`);

      await this.page.waitFor(waitTime);
    }
    await this.browser.close();
    return results;
  };

  getUrlFromPaginationInfo = async () =>
    await this.page.$$eval(
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

  getAllThumbnaiUrls = async () =>
    await this.page.$$eval(
      this.config.thumbnailClass,
      (wrappers: any[]) =>
        new Promise(resolve => {
          const result: any[] = [];
          for (const item of wrappers) {
            result.push(item.href);
          }
          resolve(result);
        }),
    );

  downloadImages = async (
    imageUrl: string[],
    prefixPath: string,
    isBrowserExist?: boolean,
  ) => {
    const counter: number[] = [];
    for (let i = 0; i < imageUrl.length; i++) {
      const item = imageUrl[i];
      const pageIndex = i + 1;

      trace('download begin: ' + item);

      await request
        .get({ url: item } as {
          url: string;
          proxy: string;
        })
        .on('error', (err: any) => {
          error(err + ' => ' + item + ': ' + pageIndex);
        })
        .pipe(
          fs
            .createWriteStream(
              joinWithRootPath(`${prefixPath}/${pageIndex}.jpg`),
            )
            .on('finish', () => {
              counter.push(pageIndex);
              success(`${pageIndex}.jpg ${counter.length}/${imageUrl.length}`);

              if (counter.length === imageUrl.length) {
                success('download completed.');
              }
            })
            .on('error', (err: any) =>
              error(`${pageIndex}.jpg failed, ${err}`),
            ),
        );
      if (isBrowserExist && i % 2 === 0) {
        await this.browser.close();
        await this.page.waitFor(this.config.waitTime);
      }
    }
  };

  getThumbnaiUrlFromDetailPage = async () => {
    const restDetailUrls = (await this.getUrlFromPaginationInfo()) as string[];
    const firstPageThumbnailUrls = (await this.getAllThumbnaiUrls()) as string[];
    await this.page.waitFor(this.config.waitTime);

    for (const item of restDetailUrls) {
      await this.gotoTargetPage(item);
      const thumbnailUrlsFromNextPage = (await this.getAllThumbnaiUrls()) as string[];
      firstPageThumbnailUrls.push(...thumbnailUrlsFromNextPage);

      info('image length: ' + firstPageThumbnailUrls.length);

      await this.page.waitFor(this.config.waitTime);
    }
    return firstPageThumbnailUrls;
  };

  fetchTargetImageUrls = async (thumbnailUrls: string[]) => {
    const images: string[] = [];
    for (let i = 0; i < thumbnailUrls.length; i++) {
      await this.gotoTargetPage(thumbnailUrls[i]);

      info(`fetching image url => ${thumbnailUrls[i]}`);

      const imgUrl: string = await this.page.$eval(
        '[id=i3] img',
        (target: any) =>
          new Promise(resolve => {
            resolve(target.src);
          }),
      );
      images.push(imgUrl);
      await this.page.waitFor(this.config.waitTime);
    }
    return images;
  };
}
