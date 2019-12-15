import Service from '../ExhentaiService';
const {
  goto,
  mockDetail,
  mockImgUrl,
  mockComicNamePrefix,
  mockComicNameSuffix,
} = require('../__mocks__/puppeteer-core');
const { ensureDirSync, ensureFileSync } = require('../__mocks__/fs-extra');
import MockDate from 'mockdate';
import { ExHentaiInfoItem } from '../../controller/ExhentaiController';

jest.mock('../../middleware/DecoratorRouter', () => jest.fn);

describe('ExhentaiService', () => {
  let service: any;

  beforeEach(async () => {
    service = new Service();
    await service.initBrowser();
    MockDate.set(new Date('2019-04-09T00:00:00'));
  });

  afterEach(() => {
    MockDate.reset();
    service = null;
  });

  it('initBrowser and setExHentaiCookie', async () => {
    const result = await service.initBrowser();
    expect(service.page).toEqual(result.page);
  });

  it('gotoTargetPage', async () => {
    await service.gotoTargetPage('test');
    expect(goto).toHaveBeenCalledTimes(1);
    await service.gotoTargetPage('test', true);
    expect(goto).toHaveBeenCalledTimes(3);
  });

  it('getComicName', async () => {
    const result = await service.getComicName();
    expect(result).toBe('test222222222222222222222222222111111111');
    expect(result.length).toBe(40);
  });

  it('ensureFolderForSave', async () => {
    const result = await service.ensureFolderForSave();
    expect(result).toBe('exhentai/20190409/test222222222222222222222222222111111111');
    expect(ensureDirSync).toHaveBeenCalled();
  });

  it('getListInfo', async () => {
    const result = await service.getListInfo(0, {}, '');
    expect(result).toEqual({
      currentResult: mockDetail,
      failed: false,
    });
  });

  it('handleFetchWithFailed', async () => {
    let getData = jest.fn().mockImplementation(() => ({
      currentResult: mockDetail,
      failed: false,
    }));
    let result: any = await service.handleFetchWithFailed(1, {}, 'test', getData);
    expect(result).toEqual(mockDetail);
    getData = jest.fn().mockImplementation(() => ({
      currentResult: mockDetail,
      failed: true,
    }));
    result = await service.handleFetchWithFailed(1, null, 'test', getData);
    expect(result).toBe(false);
    getData = jest.fn().mockImplementation(() => []);
    result = await service.handleFetchWithFailed(1, null, 'test', getData);
    expect(result).toEqual(undefined);
  });

  it('fetchListInfo', async () => {
    const result = await service.fetchListInfo({ postTime: Date.now() } as ExHentaiInfoItem);
    expect(result[0]).toMatchSnapshot();
  });

  it('getUrlFromPaginationInfo', async () => {
    const result = await service.getUrlFromPaginationInfo();
    expect(result).toEqual(mockDetail);
  });

  it('getAllThumbnaiUrls', async () => {
    const result = await service.getAllThumbnaiUrls();
    expect(result).toEqual(mockDetail);
  });

  it('fetchImageUrls', async () => {
    const result = await service.fetchImageUrls(['test1', 'test2']);
    expect(result).toEqual([mockComicNamePrefix + mockComicNameSuffix, mockComicNamePrefix + mockComicNameSuffix]);
  });

  it('downloadImages', async () => {
    await service.downloadImages(mockImgUrl, 'prefix');
    expect(ensureFileSync).toHaveBeenCalled();
    await service.downloadImages(mockImgUrl, 'prefix', true);
    expect(ensureFileSync).toHaveBeenCalled();
  });

  it('getThumbnailUrlFromDetailPage', async () => {
    const result = await service.getThumbnailUrlFromDetailPage(mockImgUrl);
    expect(result).toEqual([...mockDetail, ...mockDetail]);
  });
});
