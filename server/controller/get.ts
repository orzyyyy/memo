const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer-core');
const exHentaiCookie = require('../resource/exHentaiCookie');

export interface ExHentaiInfoItem {
  name: string;
  detailUrl: string;
  postTime: number;
  thumbnailUrl: string;
}

const get = async (ctx: any) => {
  ctx.type = 'html';
  ctx.response.body = fs.createReadStream(
    path.join(process.cwd(), 'dist', 'index.html'),
  );
};

const setExHentaiCookie = async (page: any) => {
  for (const item of exHentaiCookie) {
    await page.setCookie(item);
  }
};

const getExHentaiInfo = async ({
  pageIndex,
  page,
}: {
  pageIndex: number;
  page: any;
}) => {
  await page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' });
  await page.goto(
    'https://exhentai.org/?f_cats=1001&f_search=chinese&inline_set=dm_t&page=' +
      pageIndex,
    { waitUntil: 'domcontentloaded' },
  );
  const exHentaiInfo = await page.$$eval(
    'div.gl1t',
    (wrappers: any[]) =>
      new Promise(resolve => {
        const results: ExHentaiInfoItem[] = [];
        for (const item of wrappers) {
          const tempPostTime = item.lastChild.innerText.replace(/[^0-9]/gi, '');
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

const getExhentai = async (ctx: any) => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--proxy-server=127.0.0.1:1080'],
    devtools: true,
  });
  const page = await browser.newPage();

  setExHentaiCookie(page);
  let results: ExHentaiInfoItem[] = [];
  for (let i = 0; i < 1; i++) {
    const result = await getExHentaiInfo({ pageIndex: i, page });
    results = [...results, ...result];
    await page.waitFor(4000);
  }

  await browser.close();
  ctx.response.body = JSON.stringify(results);
};

module.exports = {
  'GET /': get,
  'GET /exhentai': getExhentai,
};
export {};
