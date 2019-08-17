import React from 'react';
import { Button, Input, Select } from 'antd';
import { MainPageProps } from './MainPage';
import { Plus } from '@ant-design/icons';
const { Option } = Select;

const MainPageHeader = ({
  Header,
  onExhentaiDownload,
  onEdit,
  exhentaiDateSet,
}: MainPageProps & { Header: any }) => (
  <Header
    style={{ background: 'rgba(0, 0, 0, 0)', height: 48, position: 'relative' }}
  >
    <Select style={{ position: 'absolute', width: 160, top: 10, left: 8 }}>
      {exhentaiDateSet.map(timeStamp => (
        <Option value={timeStamp} key={`exhentai-time-stamp-${timeStamp}`}>
          {timeStamp}
        </Option>
      ))}
    </Select>
    <Input
      onPressEnter={onExhentaiDownload}
      style={{ position: 'absolute', right: 80, top: 10, width: 350 }}
    />
    <Button
      style={{ position: 'absolute', right: 24, top: 10 }}
      onClick={() => onEdit()}
    >
      <Plus />
    </Button>
  </Header>
);

export default MainPageHeader;
