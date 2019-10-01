import ToyController from '../ToyController';

describe('ToyController', () => {
  it('get snapshots', () => {
    expect(ToyController).toMatchSnapshot();
  });
});
