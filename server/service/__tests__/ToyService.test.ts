import Service from '../ToyService';
const { innerMock } = require('../__mocks__/mysql');

describe('ToyService', () => {
  let service: Service;

  beforeEach(async () => {
    service = new Service();
  });

  it('getDataBySqlKey', async () => {
    const result = await service.getDataBySqlKey('test1', { id: 1 });
    expect(result).toEqual({ fields: 'fields', result: 'result' });
  });

  it('single connected instance', () => {
    expect(Service.getConnection()).toEqual(innerMock);
  });
});
