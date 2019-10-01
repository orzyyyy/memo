import config from '../nino.koei';

describe('nino.koei', () => {
  it('export correctly', () => {
    expect(Object.keys(config.entry)).toEqual([
      'markdown-detail',
      'markdown-editor',
      'mapping-detail',
      'mapping-editor',
      'ninoninoni',
    ]);
    expect(config.output).toEqual({});
  });
});
