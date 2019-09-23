import { useState, useEffect } from 'react';
import { useBindKeyDown } from './useBindKeyDown';
import { DataSource } from 'mini-xmind/lib/canvas/core';

export function useFetchDocumentData(
  id: string,
  type: 'mapping' | 'markdown',
  onSaveCallback?: (data: DataSource) => void,
) {
  const ext = type === 'mapping' ? 'json' : 'md';
  const url = `${type}/${id}/${id}.${ext}`;
  const [data, setData] = useState();
  useBindKeyDown(data, onSaveCallback);

  useEffect(() => {
    const fetchData = async () => {
      const convertType = type === 'mapping' ? 'json' : 'text';
      const response = await fetch(url);
      const result = await response[convertType]();
      setData(result);
    };
    fetchData();
  }, [id]);

  return [data, setData];
}
