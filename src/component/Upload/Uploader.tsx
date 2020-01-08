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
  onChange?: (file: UploadFile) => void;
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

  const onFileChange = (e: any, callback?: Function) => {
    const file = e.target.files.length ? e.target.files[0] : null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = { url: reader.result };
      file.url = null;
      if (isImageUrl(result)) {
        file.url = reader.result;
      }
      file.id = file.size.toString() + new Date().getTime();
      if (onChange) {
        onChange(file);
      }
      if (callback) {
        callback(file);
      }
    };
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
