const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer-core');
const exHentaiCookie = require('../resource/exHentaiCookie');

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

const getExhentaiImageSrc = async ({
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
  const result = await page.$$eval(
    'img',
    (images: any[]) =>
      new Promise(resolve => {
        const filterImages = images
          .filter((image: any) => !image.title.includes('torrent'))
          .map((item: any) => (item = item.src));
        resolve(filterImages);
      }),
  );
  return result;
};

const getExhentai = async (ctx: any) => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--proxy-server=127.0.0.1:1080'],
  });
  const page = await browser.newPage();
  setExHentaiCookie(page);
  let results: string[] = [];
  for (let i = 0; i < 5; i++) {
    const result = await getExhentaiImageSrc({ pageIndex: i, page });
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
