import React from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from './MainPageDataController';

export interface ExHentaiListDataControllerProps {
  dataSource: ExHentaiInfoItem[];
  isLocal: boolean;
}

export const handleExhentaiDownload = async ({ url }: DownloadProps) => {
  if (!url) {
    alert('地址为空');
    return 'failed';
  }
  const shouldDownload = confirm('是否下载？');
  if (!shouldDownload) {
    return 'cancel';
  }
  await fetch('/api/memo/exhentai/download', {
    body: JSON.stringify({ url }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return 'success';
};

const onDetail = (url: string) => {
  window.open(url);
};

const ExHentaiListDataController = ({ dataSource, isLocal }: ExHentaiListDataControllerProps) => {
  const notify = <span>该页面仅在本地可用</span>;
  return (
    <>
      {!isLocal && !dataSource.length && notify}
      <ExHentaiList
        dataSource={dataSource}
        onDownload={handleExhentaiDownload}
        wrapperHeight={document.body.clientHeight - 48 - 90}
        onDetail={onDetail}
      />
    </>
  );
};

export default ExHentaiListDataController;
