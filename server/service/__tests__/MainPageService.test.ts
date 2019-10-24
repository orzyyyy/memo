import Service from '../MainPageService';

describe('MainPageService', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  let service: Service;

  beforeEach(async () => {
    service = new Service();
  });

  afterEach(() => {
    logSpy.mockReset();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('getDist', () => {
    const result = service.getDist();
    expect(result).toBe('dist');
  });
});
