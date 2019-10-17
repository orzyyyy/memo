import { renderHook } from '@testing-library/react-hooks';
import { useFetchDocumentData } from '../useFetchDocumentData';

describe('useFetchDocumentData', () => {
  const originFetch = window.fetch;

  beforeAll(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        then: resolve => resolve({ text: jest.fn() }),
      }),
    );
  });

  afterAll(() => {
    window.fetch = originFetch;
  });

  it('works', () => {
    const [data] = renderHook(() =>
      useFetchDocumentData('mockFile', 'markdown'),
    ).result.current;
    expect(data).toBe();
  });
});
