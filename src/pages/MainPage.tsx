/* eslint-disable react/prop-types */
import React from 'react';
import './css/MainPage.css';
import { MappingProps } from '../../server/controller/DocumentController';
import { SiderChildrenProps, SiderProps } from '../../server/utils/document';
import { DownloadProps } from './ExHentaiList';
import Sider from '../component/Sider';

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
    <a href="http://www.beian.miit.gov.cn">IPC证：浙ICP备19050866号-1</a>
  </footer>
);

const MainPage = ({ onMenuClick, siderSelectedKey, menuData, renderContent, isLocal, siderOpenKey }: MainPageProps) => {
  const handleMenuClick = ({ parent, children }: { parent: SiderProps; children?: SiderChildrenProps }) => {
    onMenuClick && onMenuClick([children ? children.key : parent.key, parent.key]);
  };

  const renderRealContent = () => {
    const headerHeight = isLocal ? 48 : 0;
    const footerHeight = 105;
    const wrapperHeight = document.body.clientHeight - footerHeight - headerHeight;
    return (
      <main style={{ height: wrapperHeight, marginLeft: 8, overflow: 'auto' }} className="main-page-content-wrapper">
        {renderContent && renderContent()}
      </main>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '15% 85%' }} className="MainPage">
      <Sider
        dataSource={menuData}
        onClick={handleMenuClick}
        siderOpenKey={siderOpenKey || ''}
        siderSelectedKey={siderSelectedKey || ''}
      />
      <div style={{ gridTemplateRows: '5% 90% 10%' }}>
        {renderRealContent()}
        {renderFooter()}
      </div>
    </div>
  );
};

export default MainPage;
