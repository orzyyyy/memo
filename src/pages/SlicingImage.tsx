import React, { useState, useRef } from 'react';
import './css/slicing-image.css';
import Upload from '../component/Upload';
import { UploadFile } from '../component/Upload/Uploader';
import Button from '../component/Button';

export interface BaseDocumentProps {
  innerHTML: string;
  className?: string;
}
export type ColProps = { [key: number]: React.RefObject<HTMLCanvasElement> };

const defaultColNum = 7;
const defaultRowNum = 2;

const SlicingImage = ({ innerHTML, className }: BaseDocumentProps) => {
  // there is a bug
  // at the beginning, the rendering data of canvas is like
  // [
  //   [col, col, col, ...] => this is row1
  //   [col, col, col, ...] => this is row2
  // ]
  // react can not find refs of these canvas elements
  // but it works when the data is like
  // [
  //   { 0: col, 1: col, 2: col } => this is row1
  //   { 0: col, 1: col, 2: col } => this is row2
  // ]
  // this is the meaning of `ColProps`
  const canvasArr: ColProps[] = [];
  for (let i = 0; i < defaultRowNum; i++) {
    const col: ColProps = {};
    for (let j = 0; j < defaultColNum; j++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      col[j] = useRef<HTMLCanvasElement>(null);
    }
    canvasArr.push(col);
  }
  const [fileList, setFileList] = useState([] as UploadFile[]);

  const img2Canvas = async (url: string, row: number, col: number) => {
    const image = new Image();
    image.src = url;
    await new Promise(resolve => {
      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        const sliceWidth = naturalWidth / row;
        const sliceHeight = naturalHeight / col;
        for (let i = 0; i < canvasArr.length; i++) {
          const item = Object.values(canvasArr[i]);
          for (let j = 0; j < item.length; j++) {
            const instance = item[j];
            instance.current
              ?.getContext('2d')
              ?.drawImage(image, sliceWidth * j, i * sliceHeight, sliceWidth, sliceHeight, 0, 0, 35, 35);
          }
        }
        resolve();
      };
    });
  };

  const handleDownload = () => {
    const download = (set: any, i: number, row: number) => {
      const img = set.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${row + 1}-${i + 1}.png`;
      link.href = img;
      link.click();
    };
    for (let i = 0; i < canvasArr.length; i++) {
      const item = canvasArr[i];
      for (let j = 0; j < Object.values(item).length; j++) {
        const jtem = Object.values(item)[j];
        download(jtem, j, i);
      }
    }
  };

  const onChange = (changedFileList: UploadFile[]) => {
    setFileList([...fileList, ...changedFileList]);
    img2Canvas(changedFileList[0].url, defaultColNum, defaultRowNum);
  };

  const onClick = (file: UploadFile) => {
    setFileList(fileList.filter(item => item.id !== file.id));
  };

  const renderCanvas = () => {
    const result = [];
    for (let i = 0; i < canvasArr.length; i++) {
      const rows = canvasArr[i];
      result.push(<div style={{ marginTop: i === 0 ? 0 : -6 }} key={`${i}-placeholder`} />);
      for (let j = 0; j < defaultColNum; j++) {
        result.push(<canvas ref={rows[j]} width="35" height="35" key={`${i}-${j}`} />);
      }
    }
    return result;
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
      <div>{renderCanvas()}</div>
      <Button onClick={handleDownload}>下载</Button>
      <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </div>
  );
};

export default SlicingImage;
