import React from 'react';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownDetail from '../pages/MarkdownDetail';
import { getPathNameFromUrl } from '../utils';

const MarkdownDetailDataController = () => {
  const id: string = getPathNameFromUrl();
  const [data] = useFetchDocumentData(id, 'markdown');
  const screenWidth = document.body.clientWidth;

  return <MarkdownDetail dataSource={data as any} screenSize={screenWidth > 800 ? 'pc' : 'mobile'} />;
};

export default MarkdownDetailDataController;
