import React, { useRef } from 'react';
import './css/Uploader.css';
import { isImageUrl } from './utils';

export interface UploadFile {
  id: string;
  url: string;
  name: string;
  error?: boolean;
}
export interface UploaderProps {
  onChange?: (fileList: UploadFile[]) => void;
  accept?: string;
  multiple?: boolean;
  renderPlusItem?: () => void;
}

const Uploader = ({ renderPlusItem, multiple, onChange, ...rest }: UploaderProps) => {
  let uploadInput: React.RefObject<HTMLInputElement> = useRef(null);

  const triggerInputUpload = () => {
    const element = uploadInput.current;
    if (!element) {
      return;
    }
    element.click();
    element.value = '';
  };

  const onFileChange = async (e: any, callback?: Function) => {
    const files = e.target.files;
    let fileList = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const target: UploadFile = await new Promise(resolve => {
        reader.onloadend = () => {
          const result = { url: reader.result };
          file.url = null;
          if (isImageUrl(result)) {
            file.url = reader.result;
          }
          file.id = file.size.toString() + new Date().getTime();
          resolve(file);
        };
      });
      fileList.push(target);
    }
    if (onChange) {
      onChange(fileList);
    }
    if (callback) {
      callback(fileList);
    }
  };

  const plusItem = <i className="plus-icon">+</i>;

  return (
    <div className="uploader">
      <div onClick={triggerInputUpload} className="upload-item">
        <span className="upload-button">
          <input
            type="file"
            ref={uploadInput}
            style={{ display: 'none' }}
            onChange={onFileChange}
            multiple={multiple}
            {...rest}
          />
          {renderPlusItem ? renderPlusItem() : plusItem}
        </span>
      </div>
    </div>
  );
};

export default Uploader;
