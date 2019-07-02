import puppeteer from 'puppeteer-core';
import { success, info } from '../utils/log';
import { getTargetResource } from '../utils/resource';
import { ExHentaiInfoItem } from '../controller/ExhentaiController';

export default class ExhentaiService {
  cookie: any[];
  config: any;
  browser: puppeteer.Browser;
  page: puppeteer.Page;

  constructor() {
    this.cookie = getTargetResource('cookie').exhentai;
    this.config = getTargetResource('server').exhentai;
  }

  setExHentaiCookie = async () => {
    for (const item of this.cookie) {
      await this.page.setCookie(item);
    }
  };

  initBrowser = async () => {
    const { executablePath, launchArgs, devtools } = this.config;
    const browser = await puppeteer.launch({
      executablePath,
      args: launchArgs,
      devtools,
    });
    this.browser = browser;

    success('launch puppeteer');

    const page = await browser.newPage();
    this.page = page;

    this.setExHentaiCookie();

    success('set cookie');
  };

  getListInfo = async ({ pageIndex }: { pageIndex: number }) => {
    await this.page.goto('https://www.google.com/', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.goto(this.config.href + pageIndex, {
      waitUntil: 'domcontentloaded',
    });
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

  fetchListInfo = async ({ postTime }: ExHentaiInfoItem) => {
    let results: ExHentaiInfoItem[] = [];
    const { maxPageIndex, waitTime } = this.config;
    for (let i = 0; i < maxPageIndex; i++) {
      const pageIndex = i + 1;
      info(`fetching pageIndex => ${pageIndex}`);

      const result = await this.getListInfo({ pageIndex: i });
      results = [...results, ...result];
      // compare lastest date of comic, break when current comic has been fetched
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
    return results;
  };

  saveListInfo = () => {};

  getPage = () => this.page;

  getBrowser = () => this.browser;
}
