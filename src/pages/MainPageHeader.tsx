import React, { useState } from 'react';
import { MainPageProps } from './MainPage';

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

  const commonStyle = {
    background: 'white',
    height: 40,
    width: 80,
    border: '1px solid #e8e8e8',
  };

  return (
    <header style={{ height: 48, display: 'flex', alignItems: 'center', marginLeft: 16, marginTop: 8 }}>
      <select
        style={{ ...commonStyle, width: 140 }}
        value={selectValue || (exhentaiDateSet.length ? exhentaiDateSet[0] : '')}
        onChange={handleSelectChange}
      >
        {exhentaiDateSet.map(timeStamp => (
          <option value={timeStamp} key={`exhentai-time-stamp-${timeStamp}`}>
            {timeStamp}
          </option>
        ))}
      </select>
      <input onKeyDown={hanldeKeyDown} style={{ ...commonStyle, width: 280 }} />
      <button style={commonStyle} onClick={onExhentaiLoadList}>
        列表
      </button>
      <button
        style={commonStyle}
        onClick={(e: React.MouseEvent) => onEdit(undefined, true, { x: e.pageX, y: e.pageY })}
      >
        +
      </button>
    </header>
  );
};

export default MainPageHeader;
