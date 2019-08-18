import {
  joinWithRootPath,
  getTimeStamp,
  getDateStamp,
  readJsonFile,
  writeIntoJsonFile,
} from '../common';
import path from 'path';
import fs from 'fs-extra';

describe('util-common', () => {
  const originDate = Date;
  const DATE_TO_USE = new Date('2019', '1', '1');
  global.Date = jest.fn(() => DATE_TO_USE);

  afterAll(() => {
    global.Date = originDate;
  });

  it('joinWithRootPath', () => {
    const cwd = process.cwd();
    expect(joinWithRootPath('test')).toBe(cwd + '/test');
    expect(joinWithRootPath('/test')).toBe(cwd + '/test');
    expect(joinWithRootPath('./test')).toBe(cwd + '/test');
    expect(joinWithRootPath(['test'])).toBe(cwd + '/test');
    expect(joinWithRootPath(['test', 'test2'])).toBe(cwd + '/test/test2');
  });

  it('getTimeStamp and getDateStamp', () => {
    expect(getTimeStamp()).toBe('20190131160000');
    expect(getDateStamp()).toBe('20190131');
  });

  it('readJsonFile', () => {
    const configFile = readJsonFile(joinWithRootPath('server/tsconfig.json'));
    expect(configFile.compilerOptions.outDir).toBe('../bin');
    expect(readJsonFile).toThrowError();
    expect(() =>
      readJsonFile(path.join(__dirname, './empty.json')),
    ).toThrowError();
  });

  it('writeIntoJsonFile', () => {
    const originFunc = fs.outputJson;
    const catcher = jest.fn();
    fs.outputJSON = jest.fn();
    fs.outputJSON.mockReturnValue({ catch: catcher });
    const outputJSON = jest.spyOn(fs, 'outputJSON');
    writeIntoJsonFile('server/utils/__tests__/test-write.json', { test: 1 });
    expect(outputJSON).toHaveBeenCalled();
    fs.outputJSON = originFunc;
  });
});
