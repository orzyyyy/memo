import React, { Component } from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/get';
import { Empty, message } from 'antd';

export interface ExHentaiListDataControllerState {
  dataSource: ExHentaiInfoItem[] | null;
}

export default class ExHentaiListDataController extends Component<
  any,
  ExHentaiListDataControllerState
> {
  state: ExHentaiListDataControllerState = {
    dataSource: [],
  };

  componentDidMount = () => {
    fetch('/exhentai/getLastestSet')
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error();
        }
      })
      .then((url: string) => {
        fetch(url)
          .then(response => response.json())
          .then(dataSource => this.setState({ dataSource }));
      })
      .catch(() => {
        this.setState({ dataSource: null });
        console.error('fetch lastestSet error');
      });
  };

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
    const notify = <Empty description={`该页面仅在本地可用`} />;
    return (
      <>
        {!this.state.dataSource && notify}
        <ExHentaiList
          dataSource={this.state.dataSource}
          onDownload={this.handleDownload}
        />
      </>
    );
  }
}
