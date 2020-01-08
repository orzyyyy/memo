import React, { useState } from 'react';
import Upload from '../component/Upload';
import { UploadFile } from '../component/Upload/Uploader';

const SlicingImage = () => {
  const [fileList, setFileList] = useState([] as UploadFile[]);

  const onChange = (file: UploadFile) => {
    setFileList([...fileList, file]);
  };

  const onClick = (file: UploadFile) => {
    setFileList(fileList.filter(item => item.id !== file.id));
  };

  return <Upload fileList={fileList} onChange={onChange} uploaderVisible={fileList.length === 0} onClick={onClick} />;
};

export default SlicingImage;
