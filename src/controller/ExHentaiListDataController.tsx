import React, { Component } from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Empty, message } from 'antd';

export interface ExHentaiListDataControllerProps {
  dataSource: ExHentaiInfoItem[];
}

export default class ExHentaiListDataController extends Component<
  ExHentaiListDataControllerProps
> {
  handleDownload = async (item: DownloadProps) => {
    fetch('exhentai/download', {
      body: JSON.stringify(item),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.text())
      .then(result => result === 'true' && message.success('保存完成'));
  };

  render() {
    const { dataSource } = this.props;
    const notify = <Empty description={'该页面仅在本地可用'} />;
    return (
      <>
        {!dataSource.length && notify}
        <ExHentaiList
          dataSource={dataSource}
          onDownload={this.handleDownload}
          wrapperHeight={document.body.clientHeight - 48 - 90}
        />
      </>
    );
  }
}
