import { useState, useEffect } from 'react';
import { useBindKeyDown } from './useBindKeyDown';

export function useFetchDocumentData(
  id: string,
  type: 'mapping' | 'markdown',
  onSaveCallback?: () => void,
) {
  const ext = type === 'mapping' ? 'json' : 'md';
  const url = `./assets/${type}/${id}.${ext}`;
  const [data, setData] = useState();
  const setBindKeyDownData = useBindKeyDown(data, onSaveCallback);

  useEffect(() => {
    const fetchData = async () => {
      const convertType = type === 'mapping' ? 'json' : 'text';
      const response = await fetch(url);
      const result = await response[convertType]();
      setData(result);
      setBindKeyDownData(result);
    };
    fetchData();
  }, [id]);

  return [data, setData];
}
