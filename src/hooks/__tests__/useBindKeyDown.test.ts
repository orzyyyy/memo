import { renderHook, act } from '@testing-library/react-hooks';
import { useBindKeyDown } from '../useBindKeyDown';

describe('useBindKeyDown', () => {
  it('keydown works', () => {
    const onSaveCallback = jest.fn();
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    const { result }: { result: any } = renderHook(() => useBindKeyDown({ test: 1 }));
    act(() => {
      result.current({ ctrlKey: true, keyCode: 83, preventDefault }, {}, onSaveCallback);
    });
    expect(onSaveCallback).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();

    act(() => {
      result.current({ stopPropagation });
    });
    expect(stopPropagation).toHaveBeenCalled();
  });
});
