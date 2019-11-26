import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { MainPageProps } from './MainPage';
import { Plus } from '@ant-design/icons';
import { SelectValue } from 'antd/lib/select';
const { Option } = Select;

const MainPageHeader = ({
  onExhentaiDownload,
  onEdit,
  exhentaiDateSet,
  onExhentaiSelectChange,
  onExhentaiLoadList,
}: MainPageProps) => {
  const [selectValue, setSelectValue] = useState();

  const handleSelectChange = (value: SelectValue) => {
    onExhentaiSelectChange(value);
    setSelectValue(value);
  };

  return (
    <header style={{ height: 48, position: 'relative' }}>
      <Select
        style={{ position: 'absolute', width: 160, top: 10, left: 8 }}
        value={selectValue || (exhentaiDateSet.length ? exhentaiDateSet[0] : '')}
        onChange={handleSelectChange}
      >
        {exhentaiDateSet.map(timeStamp => (
          <Option value={timeStamp} key={`exhentai-time-stamp-${timeStamp}`}>
            {timeStamp}
          </Option>
        ))}
      </Select>
      <Button style={{ position: 'absolute', left: 180, top: 10 }} type="dashed" onClick={onExhentaiLoadList}>
        列表
      </Button>
      <Input onPressEnter={onExhentaiDownload} style={{ position: 'absolute', right: 80, top: 10, width: 350 }} />
      <Button style={{ position: 'absolute', right: 24, top: 10 }} onClick={() => onEdit(undefined, true)}>
        <Plus />
      </Button>
    </header>
  );
};

export default MainPageHeader;
