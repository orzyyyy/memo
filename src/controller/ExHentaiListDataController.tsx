import React from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';

export interface ExHentaiListDataControllerProps {
  dataSource: ExHentaiInfoItem[];
}

export const handleExhentaiDownload = async ({ url }: DownloadProps) => {
  if (!url) {
    alert('地址为空');
    return 'failed';
  }
  alert('response before post');
  await fetch('/api/memo/exhentai/download', {
    body: JSON.stringify({ url }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  alert('response after post');
  return 'success';
};

const onDetail = (url: string) => {
  window.open(url);
};

const ExHentaiListDataController = ({ dataSource }: ExHentaiListDataControllerProps) => {
  const notify = <span>该页面仅在本地可用</span>;
  return (
    <>
      {!dataSource.length && notify}
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
