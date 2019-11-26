/* eslint-disable react/prop-types */
import React from 'react';
import './css/MainPage.css';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { SelectValue } from 'antd/lib/select';
import MainPageHeader from './MainPageHeader';
import { MappingProps } from '../../server/controller/DocumentController';
import { SiderChildrenProps, SiderProps } from '../../server/utils/document';

export interface MainPageProps {
  onEdit: (dataItem?: MappingProps, visible?: boolean) => void;
  menuData?: SiderProps[];
  onExhentaiDownload: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  renderContent?: () => React.ReactNode;
  onMenuClick?: (keyPath: string[]) => void;
  isLocal?: boolean;
  exhentaiDateSet: string[];
  onExhentaiSelectChange: (value: SelectValue) => void;
  siderOpenKey?: string;
  siderSelectedKey?: string;
  onExhentaiLoadList: () => void;
}

const renderFooter = () => (
  <footer style={{ textAlign: 'center' }}>
    <div>
      你睡了一下午，醒的时候屋子里黑漆漆、一点声音都没有。抬头望望窗外，天还没完全黑。四处摸了摸，在枕头下找到手机。打开后屏幕亮起，干净，没有一条消息
    </div>
    <div>打开电脑，打开 github。pull request 写得很菜，连 core 都在喷你，但忽然就不孤独了</div>
  </footer>
);

const MainPage = ({
  onMenuClick,
  siderSelectedKey,
  menuData,
  renderContent,
  isLocal,
  onExhentaiDownload,
  onEdit,
  exhentaiDateSet,
  onExhentaiSelectChange,
  onExhentaiLoadList,
}: MainPageProps) => {
  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    onMenuClick && onMenuClick(keyPath);
  };

  const renderSider = () => {
    return (
      <aside>
        <Menu selectedKeys={[siderSelectedKey || '']} mode="inline" onClick={handleMenuClick}>
          {menuData &&
            menuData.map((item: SiderProps) => {
              const { key, title, children } = item;
              if (!children) {
                return <Menu.Item key={key}>{title}</Menu.Item>;
              }
              return (
                <SubMenu key={key} title={title}>
                  {children.map((jtem: SiderChildrenProps) => (
                    <Menu.Item key={jtem.key}>{jtem.value}</Menu.Item>
                  ))}
                </SubMenu>
              );
            })}
        </Menu>
      </aside>
    );
  };

  const renderRealContent = () => {
    const headerHeight = isLocal ? 48 : 0;
    const wrapperHeight = document.body.clientHeight - 90 - headerHeight;
    return (
      <div
        style={{
          padding: '8px 16px 8px 8px',
          height: wrapperHeight,
          marginLeft: 8,
        }}
        className="main-page-content-wrapper"
      >
        {renderContent && renderContent()}
      </div>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '16% 84%' }}>
      {renderSider()}
      <div style={{ display: 'grid', gridTemplateRows: '5% 90% 10%' }}>
        {isLocal && (
          <MainPageHeader
            onExhentaiDownload={onExhentaiDownload}
            onEdit={onEdit}
            exhentaiDateSet={exhentaiDateSet}
            onExhentaiSelectChange={onExhentaiSelectChange}
            onExhentaiLoadList={onExhentaiLoadList}
          />
        )}
        {renderRealContent()}
        {renderFooter()}
      </div>
    </div>
  );
};

export default MainPage;
