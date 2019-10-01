import DocumentController from '../DocumentController';

describe('DocumentController', () => {
  it('get snapshots', () => {
    expect(DocumentController).toMatchSnapshot();
  });
});
