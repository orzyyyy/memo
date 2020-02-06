import React, { useState, useRef } from 'react';
import './css/slicing-image.css';
import Upload from '../component/Upload';
import { UploadFile } from '../component/Upload/Uploader';
import Button from '../component/Button';

export interface BaseDocumentProps {
  innerHTML: string;
  className?: string;
}

const SlicingImage = ({ innerHTML, className }: BaseDocumentProps) => {
  const canvasRow = [...Array(7).keys()];
  const canvasSet1: any = {};
  const canvasSet2: any = {};
  const ctxSet1: any = {};
  const ctxSet2: any = {};
  for (let i of canvasRow) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    canvasSet1[i] = useRef<HTMLCanvasElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    canvasSet2[i] = useRef<HTMLCanvasElement>(null);
  }
  const [fileList, setFileList] = useState([] as UploadFile[]);

  const img2Canvas = async (url: string, row: number, col: number) => {
    for (let i of canvasRow) {
      ctxSet1[i] = canvasSet1[i].current.getContext('2d');
      ctxSet2[i] = canvasSet2[i].current.getContext('2d');
    }
    const image = new Image();
    image.src = url;
    await new Promise(resolve => {
      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        const sliceWidth = naturalWidth / row;
        const sliceHeight = naturalHeight / col;
        for (let i of canvasRow) {
          ctxSet1[i].drawImage(image, sliceWidth * i, 0, sliceWidth, sliceHeight, 0, 0, 35, 35);
          ctxSet2[i].drawImage(image, sliceWidth * i, sliceHeight, sliceWidth, sliceHeight, 0, 0, 35, 35);
        }

        resolve();
      };
    });
  };

  const handleDownload = () => {
    const download = (set: any, i: number, row: number) => {
      const img = set[i].current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${row}-${i + 1}.png`;
      link.href = img;
      link.click();
    };
    for (const i of canvasRow) {
      download(canvasSet1, i, 1);
    }
    // hack: if not using setTimeout, when clicking download,
    // it only download images in the first line, such as 1-x,
    // but not for 2-x. Maybe it's a browser issue.
    setTimeout(() => {
      for (const i of canvasRow) {
        download(canvasSet2, i, 2);
      }
    }, 1000);
  };

  const onChange = (changedFileList: UploadFile[]) => {
    setFileList([...fileList, ...changedFileList]);
    img2Canvas(changedFileList[0].url, 7, 2);
  };

  const onClick = (file: UploadFile) => {
    setFileList(fileList.filter(item => item.id !== file.id));
  };

  return (
    <div className={`slicing-image ${className}`}>
      <Upload
        fileList={fileList}
        onChange={onChange}
        uploaderVisible={fileList.length === 0}
        onClick={onClick}
        accept="image/*"
      />
      <div>
        {canvasRow.map(i => (
          <canvas ref={canvasSet1[i]} width="35" height="35" key={i} />
        ))}
      </div>
      <div style={{ marginTop: -6 }}>
        {canvasRow.map(i => (
          <canvas ref={canvasSet2[i]} width="35" height="35" key={i} />
        ))}
      </div>
      <Button onClick={handleDownload}>下载</Button>
      <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </div>
  );
};

export default SlicingImage;
