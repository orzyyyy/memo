import { getPathNameFromUrl } from '..';

describe('src/utils', () => {
  it('getPathNameFromUrl', () => {
    expect(getPathNameFromUrl()).toBe('');
    expect(getPathNameFromUrl('/test1/test2/')).toBe('test2');
    expect(getPathNameFromUrl('/test1/test2')).toBe('test2');
  });
});
