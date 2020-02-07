import React, { useState, createRef, useMemo } from 'react';
import './css/slicing-image.css';
import Upload from '../component/Upload';
import { UploadFile } from '../component/Upload/Uploader';
import Button from '../component/Button';
import Input from '../component/Input';

export interface BaseDocumentProps {
  innerHTML: string;
  className?: string;
}
export type ColProps = { [key: number]: React.RefObject<HTMLCanvasElement> };

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
const generateCanvasRefArr = (rowNum: number, colNum: number) => {
  const result: ColProps[] = [];
  for (let i = 0; i < rowNum; i++) {
    const col: ColProps = {};
    for (let j = 0; j < colNum; j++) {
      col[j] = createRef<HTMLCanvasElement>();
    }
    result.push(col);
  }
  return result;
};

const SlicingImage = ({ innerHTML, className }: BaseDocumentProps) => {
  const [fileList, setFileList] = useState([] as UploadFile[]);
  const [rowNum, setRowNum] = useState(2);
  const [colNum, setColNum] = useState(7);
  const canvasArr = generateCanvasRefArr(rowNum, colNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canvasRef = useMemo(() => canvasArr, [rowNum, colNum]);

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

  const handleDownload = async () => {
    const download = (set: any, i: number, row: number) => {
      const img = set.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${row + 1}-${i + 1}.png`;
      link.href = img;
      link.click();
    };
    for (let i = 0; i < canvasRef.length; i++) {
      const item = canvasRef[i];
      for (let j = 0; j < Object.values(item).length; j++) {
        const jtem = Object.values(item)[j];
        // for chrome, it seems that it can only download 10 pictures at a time.
        // so hack for it, when download completed, sleep for 100ms.
        await new Promise(resolve => {
          download(jtem, j, i);
          setTimeout(() => {
            resolve();
          }, 100);
        });
      }
    }
  };

  const onUploaderChange = (changedFileList: UploadFile[]) => {
    setFileList([...fileList, ...changedFileList]);
    img2Canvas(changedFileList[0].url, colNum, rowNum);
  };

  const onClick = (file: UploadFile) => {
    setFileList(fileList.filter(item => item.id !== file.id));
  };

  const renderCanvas = () => {
    const result = [];
    for (let i = 0; i < rowNum; i++) {
      result.push(<div style={{ marginTop: i === 0 ? 0 : -6 }} key={`${i}-placeholder`} />);
      for (let j = 0; j < colNum; j++) {
        result.push(<canvas ref={canvasRef[i][j]} width="35" height="35" key={`${i}-${j}`} />);
      }
    }
    return result;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'row' | 'col') => {
    const value = e.target.value;
    switch (type) {
      case 'row':
        setRowNum(parseInt(value));
        break;

      case 'col':
        setColNum(parseInt(value));
        break;

      default:
        break;
    }
  };

  return (
    <div className={`slicing-image ${className}`}>
      <span>行：</span>
      <Input type="number" value={rowNum} onChange={e => onInputChange(e, 'row')} />
      <span>列：</span>
      <Input type="number" value={colNum} onChange={e => onInputChange(e, 'col')} />
      <Upload
        fileList={fileList}
        onChange={onUploaderChange}
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
