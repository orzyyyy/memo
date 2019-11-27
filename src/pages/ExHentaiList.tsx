import React from 'react';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import LazyLoad from 'react-lazyload';

export interface DownloadProps {
  url: string;
  name?: string;
}
export interface ExHentaiListProps {
  dataSource?: ExHentaiInfoItem[];
  onDownload: ({ url, name }: DownloadProps) => void;
  wrapperHeight: number;
  onDetail: (url: string) => void;
}

const renderImg = ({ onDownload, wrapperHeight, item, onDetail }: ExHentaiListProps & { item: ExHentaiInfoItem }) => (
  <div
    style={{ height: wrapperHeight / 2 }}
    onClick={() => onDetail(item.detailUrl)}
    onContextMenu={() => onDownload({ url: item.detailUrl })}
  >
    <img alt={item.name} src={item.thumbnailUrl} style={{ height: '100%' }} />
  </div>
);

const ExHentaiList = ({ dataSource = [], onDownload, wrapperHeight, onDetail }: ExHentaiListProps) => (
  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 20%)', margin: 0 }}>
    {dataSource.map(item => (
      <li key={item.detailUrl + '-' + item.postTime}>
        <LazyLoad height={wrapperHeight} once scrollContainer=".main-page-content-wrapper">
          {renderImg({ onDownload, wrapperHeight, item, onDetail })}
        </LazyLoad>
      </li>
    ))}
  </ul>
);

export default ExHentaiList;
