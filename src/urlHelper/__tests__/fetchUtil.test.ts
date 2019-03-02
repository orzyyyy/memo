import {
  checkType,
  getRealParams,
  serialize,
  getRealUrl,
  checkMethod,
} from '..';

const error = console.error;

afterEach(() => {
  console.error = error;
});

describe('fetchUtil', () => {
  let data = { apple: 1, orange: 2 };
  const dataStr = 'apple=1&orange=2';
  const url = 'http://localhost:9099';
  const proxy = 'http://localhost:9098?url=';

  it('checkType should work', () => {
    const types = [
      { type: 'test', result: false },
      { type: 'Json', result: 'json' },
      { type: 'TExT', result: 'text' },
      { type: 'HTML', result: 'html' },
    ];
    console.error = jest.fn();
    for (let item of types) {
      const { type, result } = item;
      expect(checkType(type)).toBe(result);
    }
  });

  it("fetch type shouldn't be null", () => {
    console.error = jest.fn();
    expect(checkType(undefined)).toBe(false);
    expect(checkType(null)).toBe(false);
    expect(checkType('')).toBe(false);
  });

  it('checkMethod should work', () => {
    const methods = [
      { type: 'post', result: 'POST' },
      { type: 'TEST', result: false },
      { type: '', result: false },
    ];
    console.error = jest.fn();
    for (let item of methods) {
      const { type, result } = item;
      expect(checkMethod(type)).toBe(result);
    }
  });

  it('serialize should work', () => {
    expect(serialize(data, '&')).toBe(dataStr);
    expect(serialize(data, '%26')).toBe('apple=1%26orange=2');
    expect(serialize([])).toBe('');
    expect(serialize({})).toBe('');
    expect(serialize('test')).toBe('test');
  });

  it('getRealParams should work', () => {
    expect(getRealParams(url, data, '&')).toBe('?' + dataStr);
    expect(getRealParams(url, undefined, '&')).toBe('');
    expect(getRealParams(url, {}, '&')).toBe('');
    expect(getRealParams(url, [], '&')).toBe('');
  });

  it('getRealUrl should work without proxy', () => {
    expect(getRealUrl('test', { test: url })).toBe(url);
    expect(getRealUrl('test', { test1: url }, proxy, false)).toBe(false);
  });

  it('getRealUrl should work with proxy', () => {
    expect(getRealUrl('test', { test: url }, proxy, true)).toBe(proxy + url);
    expect(getRealUrl('test', { test: url }, proxy, false)).toBe(url);
    expect(getRealUrl('test', { test1: url }, proxy, false)).toBe(false);
  });
});
