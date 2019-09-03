import { useState, useEffect } from 'react';

export function useBindKeyDown<T>(originData: T, onSaveCallback?: () => void) {
  const [data, setData] = useState(originData);

  useEffect(() => {
    window.addEventListener('keydown', bindKeyDown);
    return () => window.removeEventListener('keydown', bindKeyDown);
  }, [data]);

  async function bindKeyDown(e: KeyboardEvent) {
    const { ctrlKey, keyCode } = e;
    // ctrl + s
    if (ctrlKey && keyCode === 83) {
      e.preventDefault();
      onSaveCallback && (await onSaveCallback());
    } else {
      e.stopPropagation();
    }
  }
  return setData;
}
