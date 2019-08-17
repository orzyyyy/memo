import React, { Component } from 'react';
import ExHentaiList, { DownloadProps } from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Empty, message } from 'antd';

export interface ExHentaiListDataControllerProps {
  targetUrl: string;
}
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
    const { targetUrl } = this.props;
    if (!targetUrl) {
      this.getLatestSet();
    }
  };

  getLatestSet = () => {
    fetch('/exhentai/getLastestSet')
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error();
      })
      .then((url: string) => {
        this.getTargetSet(url);
      })
      .catch(() => {
        this.setState({ dataSource: null });
        console.error('fetch latestSet error');
      });
  };

  getTargetSet = (url: string) => {
    fetch(url)
      .then(response => response.json())
      .then(dataSource => this.setState({ dataSource }));
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
    const notify = <Empty description={'该页面仅在本地可用'} />;
    return (
      <>
        {!this.state.dataSource && notify}
        <ExHentaiList
          dataSource={this.state.dataSource}
          onDownload={this.handleDownload}
          wrapperHeight={document.body.clientHeight - 48 - 90}
        />
      </>
    );
  }
}
