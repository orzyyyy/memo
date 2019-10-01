import MainPageController from '../MainPageController';

describe('MainPageController', () => {
  it('get snapshots', () => {
    expect(MainPageController).toMatchSnapshot();
  });
});
