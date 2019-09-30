import { renderHook } from '@testing-library/react-hooks';
import { useFetchDocumentData } from '../useFetchDocumentData';

describe('useFetchDocumentData', () => {
  it('works', () => {
    const [data] = renderHook(() =>
      useFetchDocumentData('mockFile', 'markdown'),
    ).result.current;
    expect(data).toBe();
  });
});
