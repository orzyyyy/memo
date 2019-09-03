import React from 'react';
import { message } from 'antd';
import { useFetchDocumentData } from '../hooks/useFetchDocumentData';
import MarkdownEditor from '../pages/MarkdownEditor';

export interface MarkdownEditorDataControllerProps {
  match: any;
}
export interface MarkdownEditorDataControllerState {
  dataSource: string;
}
export interface MarkdownEditorSaveProps {
  id: string;
  layout: string;
  format?: boolean;
  category: 'mapping' | 'markdown';
}

export function showMessageAfterFetching(result: any) {
  result ? message.success('保存成功') : message.error('保存失败');
}

const MarkdownEditorDataController = (props: {
  match: { params: { id: string } };
}) => {
  const id: string = props.match.params.id;

  const handleOnSave = async () => {
    const params: MarkdownEditorSaveProps = {
      id,
      layout: data,
      category: 'markdown',
      format: true,
    };
    const response = await fetch('document/update', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    showMessageAfterFetching(result);
  };

  const [data, setData] = useFetchDocumentData(id, 'markdown', handleOnSave);

  const handleOnChange = (value: string) => {
    setData(value);
  };

  return (
    <MarkdownEditor
      value={data}
      onChange={handleOnChange}
      onSave={handleOnSave}
    />
  );
};

export default MarkdownEditorDataController;
