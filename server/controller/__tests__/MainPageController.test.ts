import Controller from '../MainPageController';

describe('MainPageController', () => {
  it('return dist', async () => {
    const result = await (Controller as any).stack[0].stack[0]({
      request: { body: {} },
      response: { body: '' },
      type: '',
    });
    expect(result).toBeTruthy();
  });
});
