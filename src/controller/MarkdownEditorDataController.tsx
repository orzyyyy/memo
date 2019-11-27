import React from 'react';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownEditor from '../pages/MarkdownEditor';
import { DataSource } from 'mini-xmind/lib/canvas/core';
import { getPathNameFromUrl } from '../utils';
import { DocumentCategoryProps } from '../../server/utils/document';

export interface MarkdownEditorDataControllerState {
  dataSource: string;
}
export interface MarkdownEditorSaveProps {
  id: string;
  layout: DataSource;
  format?: boolean;
  category: DocumentCategoryProps;
}

export function showMessageAfterFetching(result: string) {
  result ? alert('保存成功') : alert('保存失败');
}

const MarkdownEditorDataController = () => {
  const id: string = getPathNameFromUrl();

  const handleOnSave = async () => {
    const params: MarkdownEditorSaveProps = {
      id,
      layout: data,
      category: 'markdown',
      format: true,
    };
    const response = await fetch('../document/update/content', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    showMessageAfterFetching(result);
  };

  const [data, setData] = useFetchDocumentData(id, 'markdown-editor', handleOnSave);

  const handleOnChange = (value: string) => {
    setData(value);
  };

  return <MarkdownEditor value={data} onChange={handleOnChange} onSave={handleOnSave} />;
};

export default MarkdownEditorDataController;
