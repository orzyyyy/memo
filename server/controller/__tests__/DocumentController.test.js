import Controller from '../DocumentController';
import MockDate from 'mockdate';

const defaultPostCtx = {
  request: { body: {} },
  response: { body: '' },
};
describe('DocumentController', () => {
  it('/update/mapping', async () => {
    defaultPostCtx.request.body = {
      layout: 'layout',
      id: 'id',
      title: 'title',
      type: 'type',
      subType: 'subType',
      category: 'category',
      format: 'format',
    };
    const result = await Controller.stack[0].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });

  it('/add', async () => {
    MockDate.set(new Date('2019-04-09T00:00:00'));
    defaultPostCtx.request.body = {
      title: 'title',
      type: 'type',
      subType: 'subType',
      category: 'category',
    };
    const result = await Controller.stack[1].stack[0](defaultPostCtx);
    expect(result).toHaveLength(32);
    MockDate.reset();
  });

  it('/delete', async () => {
    defaultPostCtx.request.body = {
      id: '57ca721de1c14fb189d8bc5f6e14448c',
      category: 'markdown',
    };
    const result = await Controller.stack[2].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });

  it('/hide', async () => {
    defaultPostCtx.request.body = {
      id: 'id',
    };
    const result = await Controller.stack[3].stack[0](defaultPostCtx);
    expect(result).toBe('success');
  });

  it('/update/content', async () => {
    defaultPostCtx.request.body = {
      layout: 'layout',
      id: 'id',
      category: 'category',
      format: true,
    };
    const result = await Controller.stack[4].stack[0](defaultPostCtx);
    expect(result).toBe(`layout
`);
  });
});
