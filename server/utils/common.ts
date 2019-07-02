import path from 'path';
import fs from 'fs-extra';
import { error } from './log';
import { format } from 'date-fns';
import { ExHentaiInfoItem } from '../controller/ExhentaiController';

export const joinWithRootPath = (url: string) => path.join(process.cwd(), url);

export const writeIntoJsonFile = (url: string, content: any) =>
  fs
    .outputJSON(path.join(process.cwd(), url + '.json'), content)
    .catch((err: Error) => {
      error(`error in utils/common.writeInfoJsonFile => ${url}: ${err}`);
      throw err;
    });

export const readJsonFile = (
  url?: string | undefined | null,
): ExHentaiInfoItem[] => {
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
