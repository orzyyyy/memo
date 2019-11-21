import { useEffect } from 'react';

async function bindKeyDown<T>(e: KeyboardEvent, originData: T, onSaveCallback?: (data: T) => void) {
  const { ctrlKey, keyCode } = e;
  // ctrl + s
  if (ctrlKey && keyCode === 83) {
    e.preventDefault();
    onSaveCallback && (await onSaveCallback(originData));
  } else {
    e.stopPropagation();
  }
}

export function useBindKeyDown<T>(originData: T, onSaveCallback?: (data: T) => void) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => bindKeyDown(e, originData, onSaveCallback);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [originData, onSaveCallback]);

  return bindKeyDown;
}
