import React, { useEffect } from 'react';
import './css/UploadView.css';
import { isImageUrl } from './utils';
import Uploader, { UploaderProps, UploadFile } from './Uploader';
import classNames from 'classnames';

export interface UploadViewProps extends UploaderProps {
  fileList?: UploadFile[];
  onPress?: (file: UploadFile) => void;
  onClick?: (file: UploadFile) => void;
  uploaderVisible?: boolean;
}

const UploadView = ({
  fileList = [],
  onChange,
  accept,
  multiple,
  onClick,
  onPress,
  uploaderVisible,
}: UploadViewProps) => {
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => () => {
    clearTimer();
  });

  const handleViewTouchStart = (file: UploadFile) => {
    timer = setTimeout(() => {
      if (onPress) {
        onPress(file);
      }
    }, 800);
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };

  return (
    <div className="uploadView">
      <div className="upload-view-list">
        {fileList.map(item => {
          const { url, id, name, error } = item;

          if (isImageUrl(url)) {
            return (
              <div
                className={classNames({ 'upload-item': true, 'upload-item-error': error })}
                key={`upload-item-${id}`}
                onTouchStart={() => handleViewTouchStart(item)}
                onTouchMove={clearTimer}
                onTouchEnd={clearTimer}
                onClick={() => onClick && onClick(item)}
              >
                <img src={url} />
              </div>
            );
          }

          return (
            <div className="upload-item" key={`upload-item-${id}`}>
              {name}
            </div>
          );
        })}
        {uploaderVisible && <Uploader fileList={fileList} onChange={onChange} accept={accept} multiple={multiple} />}
      </div>
    </div>
  );
};

export default UploadView;
