import React, { useState } from 'react';
import { MainPageProps } from './MainPage';
import Button from '../component/Button';
import Input from '../component/Input';
import Select from '../component/Select';

const MainPageHeader = ({
  onExhentaiDownload,
  onEdit,
  exhentaiDateSet,
  onExhentaiSelectChange,
  onExhentaiLoadList,
}: MainPageProps) => {
  const [selectValue, setSelectValue] = useState();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onExhentaiSelectChange(value);
    setSelectValue(value);
  };

  const hanldeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as any).value;
    if (e.key === 'Enter' && value) {
      onExhentaiDownload(value);
    }
  };

  return (
    <header style={{ height: 48, display: 'flex', alignItems: 'center', marginLeft: 16, marginTop: 8 }}>
      <Select
        style={{ width: 140 }}
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
      <Button onClick={(e: React.MouseEvent) => onEdit(undefined, true, { x: e.pageX, y: e.pageY })}>+</Button>
    </header>
  );
};

export default MainPageHeader;
