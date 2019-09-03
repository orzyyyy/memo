import React from 'react';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownDetail from '../pages/MarkdownDetail';

const MarkdownDetailDataController = (props: {
  match: { params: { id: string } };
}) => {
  const id: string = props.match.params.id;
  const [data] = useFetchDocumentData(id, 'markdown');

  return <MarkdownDetail dataSource={data} />;
};

export default MarkdownDetailDataController;
