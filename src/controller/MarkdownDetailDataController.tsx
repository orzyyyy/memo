import React from 'react';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownDetail from '../pages/MarkdownDetail';
import { getPathNameFromUrl } from '../utils';

const MarkdownDetailDataController = () => {
  const id: string = getPathNameFromUrl();
  const [data] = useFetchDocumentData(id, 'markdown');

  return <MarkdownDetail dataSource={data} />;
};

export default MarkdownDetailDataController;
