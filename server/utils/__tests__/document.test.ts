import { updateSider, getWriteMappingPaths } from '../document';
const sider = require('../../../src/assets/sider.json');

describe('util-document', () => {
  it('updateSider', () => {
    expect(updateSider()).toEqual(sider);
  });

  it('getWriteMappingPaths', () => {
    expect(getWriteMappingPaths()).toMatchSnapshot();
    expect(getWriteMappingPaths('markdown', 'test-markdown')).toMatchSnapshot();
    expect(getWriteMappingPaths('mapping', 'test-mapping')).toMatchSnapshot();
  });
});
