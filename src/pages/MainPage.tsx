/* eslint-disable react/prop-types */
import React from 'react';
import './css/MainPage.css';
import MainPageHeader from './MainPageHeader';
import { MappingProps } from '../../server/controller/DocumentController';
import { SiderChildrenProps, SiderProps } from '../../server/utils/document';
import { DownloadProps } from './ExHentaiList';

export interface MainPageProps {
  onEdit: (dataItem?: MappingProps, visible?: boolean, pageInfo?: { x: number; y: number }) => void;
  menuData: SiderProps[];
  onExhentaiDownload: (value: DownloadProps) => void;
  renderContent?: () => React.ReactNode;
  onMenuClick?: (keyPath: string[]) => void;
  isLocal?: boolean;
  exhentaiDateSet: string[];
  onExhentaiSelectChange: (value: string) => void;
  siderOpenKey?: string;
  siderSelectedKey?: string;
  onExhentaiLoadList: () => void;
}

const renderFooter = () => (
  <footer style={{ textAlign: 'center', marginTop: 16 }}>
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
  siderOpenKey,
}: MainPageProps) => {
  const handleMenuClick = (item: SiderProps, jtem?: SiderChildrenProps) => {
    onMenuClick && onMenuClick([jtem ? jtem.key : item.key, item.key]);
  };

  const renderSider = () => (
    <aside>
      <ul>
        {menuData.map((item: SiderProps) => {
          if (!item.children) {
            return (
              <li
                key={item.key}
                style={{
                  cursor: 'pointer',
                  background: siderSelectedKey === item.key ? '#e6f7ff' : '',
                  height: 40,
                  lineHeight: '40px',
                  paddingLeft: 24,
                }}
                onClick={() => handleMenuClick(item)}
              >
                {item.title}
              </li>
            );
          }
          return (
            <li key={item.key} style={{ paddingLeft: 24 }}>
              {item.title}
              {item.children.map((jtem: SiderChildrenProps) => (
                <ul key={`${item.key}-${jtem.key}`}>
                  <li
                    style={{
                      paddingLeft: 24,
                      cursor: 'pointer',
                      background: siderSelectedKey === jtem.key && siderOpenKey === item.key ? '#e6f7ff' : '',
                      height: 40,
                      lineHeight: '40px',
                    }}
                    onClick={() => handleMenuClick(item, jtem)}
                  >
                    {jtem.value}
                  </li>
                </ul>
              ))}
            </li>
          );
        })}
      </ul>
    </aside>
  );
  const renderRealContent = () => {
    const headerHeight = isLocal ? 48 : 0;
    const wrapperHeight = document.body.clientHeight - 90 - headerHeight;
    return (
      <main style={{ height: wrapperHeight, marginLeft: 8, overflow: 'auto' }} className="main-page-content-wrapper">
        {renderContent && renderContent()}
      </main>
    );
  };

  const renderHeader = () =>
    isLocal && (
      <MainPageHeader
        onExhentaiDownload={onExhentaiDownload}
        onEdit={onEdit}
        exhentaiDateSet={exhentaiDateSet}
        onExhentaiSelectChange={onExhentaiSelectChange}
        onExhentaiLoadList={onExhentaiLoadList}
        menuData={[]}
      />
    );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%' }} className="MainPage">
      {renderSider()}
      <div style={{ gridTemplateRows: '5% 90% 10%' }}>
        {renderHeader()}
        {renderRealContent()}
        {renderFooter()}
      </div>
    </div>
  );
};

export default MainPage;
