import React from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Empty, message } from 'antd';

export interface ExHentaiListDataControllerProps {
  dataSource: ExHentaiInfoItem[];
}

const handleDownload = async (item: DownloadProps) => {
  fetch('exhentai/download', {
    body: JSON.stringify(item),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.text())
    .then(result => result === 'success' && message.success('保存完成'));
};

const ExHentaiListDataController = ({
  dataSource,
}: ExHentaiListDataControllerProps) => {
  const notify = <Empty description={'该页面仅在本地可用'} />;
  return (
    <>
      {!dataSource.length && notify}
      <ExHentaiList
        dataSource={dataSource}
        onDownload={handleDownload}
        wrapperHeight={document.body.clientHeight - 48 - 90}
      />
    </>
  );
};

export default ExHentaiListDataController;
