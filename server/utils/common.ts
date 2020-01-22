import path from 'path';
import fs from 'fs-extra';
import { format } from 'date-fns';

export const joinWithRootPath = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    return path.join(process.cwd(), ...paths);
  }
  return path.join(process.cwd(), paths);
};

export const writeIntoJsonFile = (url: string, content: any, spaces?: boolean) => {
  if (!url.endsWith('.json')) {
    url += '.json';
  }
  fs.outputJsonSync(joinWithRootPath(url), content, {
    spaces: spaces ? 2 : 0,
  });
};

export const readJsonFile = (url: string) => {
  if (!fs.existsSync(url)) {
    return '';
  }
  const result = JSON.parse(fs.readFileSync(url).toString());
  if (result.length === 0) {
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

export const camelCase = (value: string) => {
  return (
    value
      // 形如 a-b 会被替换为 aB
      .replace(/-\w/g, (_, i) => {
        return value.charAt(i + 1).toUpperCase();
      })
      // 首字母大写
      .replace(/^\S/, s => s.toUpperCase())
  );
};
