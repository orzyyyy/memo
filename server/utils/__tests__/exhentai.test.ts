import { handleDownloadStream } from '../exhentai';
import MockDate from 'mockdate';

jest.mock('../../middleware/DecoratorRouter', () => jest.fn);

describe('exhentai', () => {
  it('handleDownloadStream', () => {
    MockDate.set(new Date('2222-04-09T00:00:00'));
    handleDownloadStream(['test1', 'test2'], 0, [], 'prefix');
    MockDate.reset();
  });
});
