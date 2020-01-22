import { getPathNameFromUrl, camelCase } from '..';

describe('src/utils', () => {
  it('getPathNameFromUrl', () => {
    expect(getPathNameFromUrl()).toBe('');
    expect(getPathNameFromUrl('/test1/test2/')).toBe('test2');
    expect(getPathNameFromUrl('/test1/test2')).toBe('test2');
  });

  it('camelCase', () => {
    expect(camelCase('slicing-image')).toBe('SlicingImage');
  });
});
