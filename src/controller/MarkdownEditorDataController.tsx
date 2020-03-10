import React from 'react';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownEditor from '../pages/MarkdownEditor';
import { getPathNameFromUrl } from '../utils';
import { DocumentCategoryProps } from '../../server/utils/document';
import { DataSource } from 'mini-xmind/lib/canvas/core';

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
      layout: data as any,
      category: 'markdown',
    };
    const response = await fetch('/api/memo/document/update/content', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    showMessageAfterFetching(result);
  };

  const [data, setData]: any[] = useFetchDocumentData(id, 'markdown-editor', handleOnSave);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value as any);
  };

  return <MarkdownEditor value={data as any} onChange={handleOnChange} onSave={handleOnSave} />;
};

export default MarkdownEditorDataController;
