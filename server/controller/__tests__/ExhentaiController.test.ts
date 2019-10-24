import Controller from '../ExhentaiController';
import MockDate from 'mockdate';

const defaultPostCtx: any = {
  request: { body: {} },
  response: { body: '' },
  params: { key: 'test1' },
  query: { id: 1 },
};
describe('ExhentaiController', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('/', async () => {
    MockDate.set(new Date('2019-04-09T00:00:00'));
    const result = await (Controller as any).stack[0].stack[0](defaultPostCtx);
    expect(result).toBe('./assets/exhentai/20190409000000.json');
    MockDate.reset();
  });

  it('/getLatestSet', async () => {
    const result = await (Controller as any).stack[1].stack[0](defaultPostCtx);
    expect(result).toBe('./assets/exhentai/84.json');
  });

  it('/download', async () => {
    defaultPostCtx.request.body = { url: '' };
    const result = await (Controller as any).stack[2].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });

  it('/download/target', async () => {
    defaultPostCtx.query = { name: 'name', dateStamp: 'dateStamp' };
    const result = await (Controller as any).stack[3].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });

  it('/download/status', async () => {
    defaultPostCtx.query = { dateStamp: 'dateStamp' };
    const result = await (Controller as any).stack[4].stack[0](defaultPostCtx);
    expect(result).toEqual([]);
  });

  it('/dateSet', async () => {
    const result = await (Controller as any).stack[5].stack[0](defaultPostCtx);
    expect(result).toEqual(['84a65e108e3721e07261e6b3c4336ff1', '7a9a2d738fa682b6c2b1abc0471616b2']);
  });

  it('/sync', async () => {
    const result = await (Controller as any).stack[6].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });
});
