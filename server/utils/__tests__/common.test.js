import {
  joinWithRootPath,
  getTimeStamp,
  getDateStamp,
  readJsonFile,
  writeIntoJsonFile,
} from '../common';
import path from 'path';
import fs from 'fs-extra';
import MockDate from 'mockdate';

describe('util-common', () => {
  it('joinWithRootPath', () => {
    const cwd = process.cwd();
    expect(joinWithRootPath('test')).toBe(path.join(cwd + '/test'));
    expect(joinWithRootPath('/test')).toBe(path.join(cwd + '/test'));
    expect(joinWithRootPath('./test')).toBe(path.join(cwd + '/test'));
    expect(joinWithRootPath(['test'])).toBe(path.join(cwd + '/test'));
    expect(joinWithRootPath(['test', 'test2'])).toBe(
      path.join(cwd + '/test/test2'),
    );
  });

  it('getTimeStamp and getDateStamp', () => {
    MockDate.set(new Date('2019-04-09T00:00:00'));
    expect(getTimeStamp()).toBe('20190409000000');
    expect(getDateStamp()).toBe('20190409');
    MockDate.reset();
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
    fs.outputJsonSync = jest.fn();
    const outputJSON = jest.spyOn(fs, 'outputJsonSync');
    writeIntoJsonFile('server/utils/__tests__/test-write.json', { test: 1 });
    expect(outputJSON).toHaveBeenCalled();
    writeIntoJsonFile('server/utils/__tests__/test-write', { test: 1 });
    expect(outputJSON).toHaveBeenCalled();
    fs.outputJSON = originFunc;
  });
});
