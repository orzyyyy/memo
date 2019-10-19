import React from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Empty, message } from 'antd';

export interface ExHentaiListDataControllerProps {
  dataSource: ExHentaiInfoItem[];
}

export const handleExhentaiDownload = async ({ url }: DownloadProps) => {
  if (!url) {
    message.error('地址为空');
    return 'failed';
  }
  message.info('response');
  await fetch('exhentai/download', {
    body: JSON.stringify({ url }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  message.success('反应');
  return 'success';
};

const ExHentaiListDataController = ({ dataSource }: ExHentaiListDataControllerProps) => {
  const notify = <Empty description={'该页面仅在本地可用'} />;
  return (
    <>
      {!dataSource.length && notify}
      <ExHentaiList
        dataSource={dataSource}
        onDownload={handleExhentaiDownload}
        wrapperHeight={document.body.clientHeight - 48 - 90}
      />
    </>
  );
};

export default ExHentaiListDataController;
