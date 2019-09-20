import { useEffect } from 'react';

export function useBindKeyDown<T>(
  originData: T,
  onSaveCallback?: (data: any) => void,
) {
  useEffect(() => {
    window.addEventListener('keydown', bindKeyDown);
    return () => window.removeEventListener('keydown', bindKeyDown);
  }, [originData]);

  async function bindKeyDown(e: KeyboardEvent) {
    const { ctrlKey, keyCode } = e;
    // ctrl + s
    if (ctrlKey && keyCode === 83) {
      e.preventDefault();
      onSaveCallback && (await onSaveCallback(originData));
    } else {
      e.stopPropagation();
    }
  }
}
