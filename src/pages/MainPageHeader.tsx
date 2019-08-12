import React from 'react';
import { Button, Input, Icon } from 'antd';
import { MainPageProps } from './MainPage';

const MainPageHeader = ({
  Header,
  onExhentaiDownload,
  onEdit,
}: MainPageProps & { Header: any }) => (
  <Header style={{ background: 'rgba(0, 0, 0, 0)', height: 48 }}>
    <Input
      onPressEnter={onExhentaiDownload}
      style={{ position: 'absolute', right: 80, top: 10, width: 350 }}
    />
    <Button
      style={{ position: 'absolute', right: 24, top: 10 }}
      onClick={() => onEdit()}
    >
      <Icon type="plus" />
    </Button>
  </Header>
);

export default MainPageHeader;
