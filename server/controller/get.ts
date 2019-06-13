const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { format } = require('date-fns');
const toml = require('toml');
const chalk = require('chalk');

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const getTimestamp = () => `[${format(new Date(), dateFormat)}] `;
const success = (text: string) =>
  // tslint:disable-next-line: no-console
  console.log(chalk.greenBright(getTimestamp() + '✅   ' + text));
const error = (text: string) =>
  // tslint:disable-next-line: no-console
  console.log(chalk.red(getTimestamp() + text));
// tslint:disable-next-line: no-console
// const info = (text: string) => console.log(chalk.yellowBright(text));
const trace = (text: string) =>
  // tslint:disable-next-line: no-console
  console.log(chalk.cyanBright(getTimestamp() + text));

const { exHentai: exHentaiCookie } = toml.parse(
  fs.readFileSync(path.join(__dirname, '../resource/cookie.toml'), 'utf-8'),
);
const { exHentai } = toml.parse(
  fs.readFileSync(path.join(__dirname, '../resource/server.toml'), 'utf-8'),
);

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
  await page.goto(exHentai.href + pageIndex, { waitUntil: 'domcontentloaded' });
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
    executablePath: exHentai.executablePath,
    args: exHentai.lauchArgs,
    devtools: exHentai.devtools,
  });
  success('launch puppeteer');
  const page = await browser.newPage();

  setExHentaiCookie(page);
  success('set cookie');
  let results: ExHentaiInfoItem[] = [];
  for (let i = 0; i < exHentai.maxPageIndex; i++) {
    const result = await getExHentaiInfo({ pageIndex: i, page });
    results = [...results, ...result];
    trace(`fetching pageIndex => ${i + 1}`);
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
};

module.exports = {
  'GET /': get,
  'GET /exhentai': getExhentai,
};
export {};
