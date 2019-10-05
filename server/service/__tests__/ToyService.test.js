import Service from '../ToyService';

describe('ToyService', () => {
  let service;

  beforeEach(async () => {
    service = new Service();
  });

  afterEach(() => {
    service = null;
  });

  it('getDataBySqlKey', async () => {
    const result = await service.getDataBySqlKey('test1', { id: 1 });
    expect(result).toEqual({ fields: 'fields', result: 'result' });
  });
});
