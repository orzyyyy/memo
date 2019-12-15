import Service from '../MainPageService';

describe('MainPageService', () => {
  let service: any;

  beforeEach(async () => {
    service = new Service();
  });

  it('getDist', () => {
    const result: any = service.getDist();
    expect(result).toBeTruthy();
  });
});
