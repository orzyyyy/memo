import { renderHook, act } from '@testing-library/react-hooks';
import { useResize } from '../useResize';

describe('useResize', () => {
  it('resize works', () => {
    let result = renderHook(() => useResize()).result;
    expect(result.current[0]).toBe(0);
    Object.defineProperty(document.body, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 100,
    });
    result = renderHook(() => useResize()).result;
    expect(result.current[0]).toBe(100);

    act(() => {
      result.current[3](200);
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current[0]).toBe(100);
  });
});
