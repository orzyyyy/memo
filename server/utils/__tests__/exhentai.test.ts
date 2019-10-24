import { handleDownloadStream, getEmptyRestDetailUrlInfo } from '../exhentai';
import MockDate from 'mockdate';

describe('exhentai', () => {
  it('handleDownloadStream', () => {
    MockDate.set(new Date('2222-04-09T00:00:00'));
    handleDownloadStream(['test1', 'test2'], 0, [], 'prefix');
    MockDate.reset();
  });

  it('getEmptyRestDetailUrlInfo', () => {
    expect(getEmptyRestDetailUrlInfo()[0].includes('20190624')).toBeTruthy();
  });
});
