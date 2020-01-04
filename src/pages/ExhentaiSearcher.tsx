import React, { useState } from 'react';
import Button from '../component/Button';
import Input from '../component/Input';
import Select from '../component/Select';
import { DownloadProps } from './ExHentaiList';

export interface ExhentaiSearcherProps {
  exhentaiDateSet: string[];
  onExhentaiDownload: ({ url }: DownloadProps) => void;
  onExhentaiSelectChange: (value: string) => void;
  onExhentaiLoadList: () => void;
}

const ExhentaiSearcher = ({
  exhentaiDateSet,
  onExhentaiDownload,
  onExhentaiSelectChange,
  onExhentaiLoadList,
}: ExhentaiSearcherProps) => {
  const [selectValue, setSelectValue] = useState();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onExhentaiSelectChange(value);
    setSelectValue(value);
  };

  const hanldeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as any).value;
    if (e.key === 'Enter' && value) {
      onExhentaiDownload({ url: value });
    }
  };

  return (
    <>
      <Select
        style={{ width: 180 }}
        value={selectValue || (exhentaiDateSet.length ? exhentaiDateSet[0] : '')}
        onChange={handleSelectChange}
      >
        {exhentaiDateSet.map(timeStamp => (
          <option value={timeStamp} key={`exhentai-time-stamp-${timeStamp}`} style={{ height: 40 }}>
            {timeStamp}
          </option>
        ))}
      </Select>
      <Input onKeyDown={hanldeKeyDown} style={{ width: 280 }} />
      <Button onClick={onExhentaiLoadList}>列表</Button>
    </>
  );
};

export default ExhentaiSearcher;
