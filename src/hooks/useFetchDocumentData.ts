import { useState, useEffect } from 'react';
import { useBindKeyDown } from './useBindKeyDown';
import { DataSource } from 'mini-xmind/lib/canvas/core';

export function useFetchDocumentData(
  id: string,
  type: 'mapping' | 'markdown',
  onSaveCallback?: (data: DataSource) => void,
) {
  const ext = type === 'mapping' ? 'json' : 'md';
  // If you want to change this,
  // check the base url in your local, netlify and gh-pages
  // This took me a long long time to debug this
  //
  // Base url in the index.html is `/`, which means
  // if you don't want get 404 in gh-pages, you must
  // fetch data as a related path, like `./xxx/yyy`,
  // not `/xxx/yyy`
  const url = `./${type}/${id}/${id}.${ext}`;
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
