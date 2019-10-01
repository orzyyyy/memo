import ExhentaiController from '../ExhentaiController';

describe('ExhentaiController', () => {
  it('get snapshots', () => {
    expect(ExhentaiController).toMatchSnapshot();
  });
});
