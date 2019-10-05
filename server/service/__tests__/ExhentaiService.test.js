import Service from '../ExhentaiService';
import { goto, mockDetail, mockImgUrl } from '../__mocks__/puppeteer-core';
import { ensureDirSync, ensureFileSync } from '../__mocks__/fs-extra';
import MockDate from 'mockdate';

describe('ExhentaiService', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  let service;

  beforeEach(async () => {
    service = new Service();
    await service.initBrowser();
    MockDate.set(new Date('2019-04-09T00:00:00'));
  });

  afterEach(() => {
    logSpy.mockReset();
    service = null;
    MockDate.reset();
  });

  afterAll(() => {
    logSpy.mockRestore();
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
    expect(result).toBe('test');
  });

  it('ensureFolderForSave', async () => {
    const result = await service.ensureFolderForSave();
    expect(result).toBe('exhentai/20190409/test');
    expect(ensureDirSync).toHaveBeenCalled();
  });

  it('getListInfo', async () => {
    const result = await service.getListInfo();
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
    let result = await service.handleFetchWithFailed(1, {}, 'test', getData);
    expect(result).toEqual(mockDetail);
    getData = jest.fn().mockImplementation(() => ({
      currentResult: mockDetail,
      failed: true,
    }));
    result = await service.handleFetchWithFailed(1, null, 'test', getData);
    expect(result).toBe(false);
    getData = jest.fn().mockImplementation(() => []);
    result = await service.handleFetchWithFailed(1, null, 'test', getData);
    expect(result).toEqual();
  });

  it('fetchListInfo', async () => {
    const result = await service.fetchListInfo({ postTime: Date.now() });
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
    expect(result).toEqual(['!@#$% test （——）：；', '!@#$% test （——）：；']);
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
