import Service from '../MainPageService';

describe('MainPageService', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  let service: any;

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
    const result: any = service.getDist();
    expect(result).toBeTruthy();
  });
});
