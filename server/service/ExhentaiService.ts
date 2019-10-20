import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';
import { success, info, error, trace } from '../utils/log';
import { getTargetResource } from '../utils/resource';
import { ExHentaiInfoItem } from '../controller/ExhentaiController';
import { joinWithRootPath, getDateStamp } from '../utils/common';
import { handleDownloadStream } from '../utils/exhentai';

export interface InfoListProps<T> {
  currentResult: T;
  failed: boolean;
}

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
  }

  setExHentaiCookie = async () => {
    for (const item of this.cookie) {
      await this.page.setCookie(item);
    }
  };

  initBrowser = async () => {
    const { winChromePath, linuxChromePath, winLaunchArgs, linuxLaunchArgs, headless } = this.config;
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
      await this.page.goto('https://www.google.com/', {
        waitUntil: 'domcontentloaded',
      });
    }
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  };

  getComicName = async () => {
    const name: any = await this.page.$eval('#gj', (target: any) => new Promise(resolve => resolve(target.innerText)));
    const result = name
      .replace(/[!@#$%^&*·！#￥（——）：；“”‘、，|《。》？、【】[\]]/gim, '')
      .replace(/\s+/g, '')
      .substr(0, 40);
    return result;
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

  getListInfo = async <T>(pageIndex: number, prevResult: T, targetUrl: string): Promise<InfoListProps<any>> => {
    const timer = Date.now();
    try {
      await this.gotoTargetPage(targetUrl, true);
      if (Date.now() - timer >= this.config.requestTime) {
        throw Error('time out at page index: ' + pageIndex);
      }
    } catch (err) {
      error(err);
      return {
        currentResult: prevResult,
        failed: true,
      };
    }
    const exHentaiInfo: ExHentaiInfoItem[] = await this.page.$$eval(
      'div.gl1t',
      (wrappers: any[]) =>
        new Promise(resolve => {
          const results: ExHentaiInfoItem[] = [];
          for (const item of wrappers) {
            const originDate = item.lastChild.innerText.replace(/[^0-9]/gi, '').substring(0, 12);
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
    return {
      currentResult: exHentaiInfo,
      failed: false,
    };
  };

  handleFetchWithFailed = async <T>(pageIndex: number, result: T, url: string, getData: Function) => {
    const infoList: InfoListProps<T> = await getData(pageIndex, result, url);
    const { waitTimeAfterError } = this.config;
    if (infoList.failed) {
      trace(`re-request after ${waitTimeAfterError} ms`);
      await this.page.waitFor(waitTimeAfterError);
      trace('re-request start');
      return false;
    } else {
      return infoList.currentResult;
    }
  };

  fetchListInfo = async ({ postTime }: ExHentaiInfoItem) => {
    let results: ExHentaiInfoItem[] = [];
    const { maxPageIndex, waitTime } = this.config;
    for (let i = 0; i < maxPageIndex; i++) {
      const pageIndex = i + 1;
      const targetUrl = this.config.href + i;
      info(`fetching pageIndex => ${pageIndex}`);

      let target: ExHentaiInfoItem[] | boolean = true;
      do {
        target = await this.handleFetchWithFailed(i, results, targetUrl, this.getListInfo);
      } while (!target);
      const result: any = target;
      results = [...results, ...result];
      // compare latest date of comic, break when current comic has been fetched
      if (result.length > 0) {
        const currentItem = result[result.length - 1];
        if (currentItem.postTime < postTime) {
          info(`get newest page now => ${pageIndex}, at ${currentItem.detailUrl}`);
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

  getUrlFromPaginationInfo = async (): Promise<string[]> =>
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

  getAllThumbnaiUrls = async (): Promise<string[]> =>
    await this.page.$$eval(
      this.config.thumbnailClass,
      (wrappers: any[]) =>
        new Promise(resolve => {
          const result: string[] = [];
          for (const item of wrappers) {
            result.push(item.href);
          }
          resolve(result);
        }),
    );

  downloadImages = async (imageUrl: string[], prefixPath: string, isBrowserExist?: boolean) => {
    const counter: number[] = [];
    for (let i = 0; i < imageUrl.length; i++) {
      await handleDownloadStream(imageUrl, i, counter, prefixPath);
      if (isBrowserExist) {
        await this.browser.close();
      }
      if (i % 2 === 0) {
        await this.page.waitFor(this.config.waitTime);
      }
    }
  };

  getThumbnailUrlFromDetailPage = async (restDetailUrls: string[]) => {
    const result: string[] = [];
    for (const item of restDetailUrls) {
      await this.gotoTargetPage(item, true);
      const thumbnailUrls: string[] = await this.getAllThumbnaiUrls();
      result.push(...thumbnailUrls);

      info('image length: ' + result.length);

      await this.page.waitFor(this.config.waitTime);
    }
    return result;
  };

  fetchImageUrls = async (thumbnailUrls: string[]) => {
    let results: string[] = [];
    for (let i = 0; i < thumbnailUrls.length; i++) {
      const item = thumbnailUrls[i];
      await this.gotoTargetPage(item);
      info(`fetching image url => ${item}`);

      let target: string[] | boolean = true;
      do {
        target = await this.handleFetchWithFailed(i, results, item, this.getTargetImageUrl);
      } while (!target);
      const result: any = target;
      results.push(result);
      await this.page.waitFor(this.config.waitTime);
    }
    return results;
  };

  getTargetImageUrl = async <T>(pageIndex: number, prevResult: T, targetUrl: string): Promise<InfoListProps<any>> => {
    const timer = Date.now();
    try {
      await this.gotoTargetPage(targetUrl, true);
      if (Date.now() - timer >= this.config.requestTime) {
        throw Error('time out at page index: ' + pageIndex);
      }
    } catch (err) {
      error(err);
      return {
        currentResult: prevResult,
        failed: true,
      };
    }
    const imgUrl: string = await this.page.$eval(
      '[id=i3] img',
      (target: any) =>
        new Promise(resolve => {
          resolve(target.src);
        }),
    );
    return {
      currentResult: imgUrl,
      failed: false,
    };
  };
}
