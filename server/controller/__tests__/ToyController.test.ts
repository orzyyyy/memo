import Controller from '../ToyController';

const defaultPostCtx = {
  request: { body: {} },
  response: { body: '' },
  params: { key: 'test1' },
  query: { id: 1 },
};
describe('ToyController', () => {
  it('/get/:key', async () => {
    const result = await (Controller as any).stack[0].stack[0](defaultPostCtx);
    expect(result).toBe('result');
  });

  it('/post/:key', async () => {
    const result = await (Controller as any).stack[1].stack[0](defaultPostCtx);
    expect(result).toBe('result');
  });
});
