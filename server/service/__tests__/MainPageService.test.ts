import Service from '../MainPageService';

describe('MainPageService', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  let service: Service;

  beforeEach(async () => {
    service = new Service();
  });

  afterEach(() => {
    logSpy.mockReset();
    service = null;
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('getDist', () => {
    const result = service.getDist();
    expect(result).toBeTruthy();
  });
});
