import path from 'path';
import fs from 'fs-extra';
import { error } from './log';
import { format } from 'date-fns';

export const joinWithRootPath = (url: string) => path.join(process.cwd(), url);

export const writeIntoJsonFile = (
  url: string,
  content: any,
  spaces?: boolean,
) => {
  if (!url.endsWith('.json')) {
    url += '.json';
  }
  fs.outputJSON(joinWithRootPath(url), content, {
    spaces: spaces ? 2 : 0,
  }).catch((err: Error) => {
    error(`error in utils/common.writeInfoJsonFile => ${url}: ${err}`);
    throw err;
  });
};

export const readJsonFile = (url?: string | undefined | null): any => {
  if (!url) {
    error('url is undefined.');
    throw Error;
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
