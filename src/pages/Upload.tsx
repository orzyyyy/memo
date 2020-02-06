import React, { useState } from 'react';
import './css/upload.css';
import { UploadFile } from '../component/Upload/Uploader';
import Upload from '../component/Upload';
import Button from '../component/Button';
import { BaseDocumentProps } from './SlicingImage';

const UploadView = ({ innerHTML, className }: BaseDocumentProps) => {
  const [fileList, setFileList] = useState([] as UploadFile[]);
  const [response, setResponse] = useState('');

  const onChange = (changedFileList: UploadFile[]) => {
    setFileList([...fileList, ...changedFileList]);
  };

  const onSubmit = async () => {
    const formData: FormData = new FormData();
    for (const item of fileList) {
      formData.append('file', item as any);
      formData.append('filename', item.name);
    }
    const response = await fetch('/api/memo/upload', { body: formData, method: 'POST' });
    const result = await response.text();
    setResponse(result);
  };

  return (
    <div className={`upload ${className}`}>
      <Upload fileList={fileList} onChange={onChange} uploaderVisible={fileList.length === 0} multiple />
      <Button onClick={onSubmit}>上传</Button>
      <>{response}</>
      <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </div>
  );
};

export default UploadView;
