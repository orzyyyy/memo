/* eslint-disable react/prop-types */
import React from 'react';
import './css/MainPage.css';
import { MappingProps } from '../../server/controller/DocumentController';
import { SiderProps } from '../../server/utils/document';
import { DownloadProps } from './ExHentaiList';
import Footer from '../component/Footer';

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

const MainPage = ({ renderContent, isLocal }: MainPageProps) => {
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
    <div className="main-page">
      <div />
      {renderRealContent()}
      <Footer />
    </div>
  );
};

export default MainPage;
