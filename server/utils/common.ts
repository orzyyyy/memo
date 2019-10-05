import path from 'path';
import fs from 'fs-extra';
import { error } from './log';
import { format } from 'date-fns';

export const joinWithRootPath = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    return path.join(process.cwd(), ...paths);
  }
  return path.join(process.cwd(), paths);
};

export const writeIntoJsonFile = (
  url: string,
  content: any,
  spaces?: boolean,
) => {
  if (!url.endsWith('.json')) {
    url += '.json';
  }
  fs.outputJsonSync(joinWithRootPath(url), content, {
    spaces: spaces ? 2 : 0,
  });
};

export const readJsonFile = (url?: string | undefined | null): any => {
  if (!url) {
    error('url is undefined.');
    throw Error;
  }
  if (!fs.existsSync(url)) {
    return '';
  }
  const result = JSON.parse(fs.readFileSync(url).toString());
  if (result.length === 0) {
    error(`file ${url} is empty.`);
    throw Error;
  }
  return result;
};

export const getTimeStamp = () => format(new Date(), 'yyyyMMddHHmmss');

export const getDateStamp = () => format(new Date(), 'yyyyMMdd');

export const uniqueByFilter = (arr: any[], fn: Function) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x: any) => fn(v, x))) {
      acc.push(v);
    }
    return acc;
  }, []);

export const search2Object = (search: string) =>
  JSON.parse(
    `{"${decodeURIComponent(search.substring(1))
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );

export const object2QueryString = (obj: any) =>
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
