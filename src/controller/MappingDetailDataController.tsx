import React, { Component } from 'react';
import MappingDetail from '../pages/MappingDetail';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { message } from 'antd';

export interface MappingDetailDataControllerProps {
  match: any;
}
export interface MappingDetailDataControllerState {
  dataSource: any;
}

export default class MappingDetailDataController extends Component<
  MappingDetailDataControllerProps,
  MappingDetailDataControllerState
> {
  state: MappingDetailDataControllerState = {
    dataSource: {},
  };

  componentDidMount() {
    this.getTargetMapping();
  }

  handleOnSave = async (data: any) => {
    const targetId = this.props.match.params.id;
    const response = await fetch('/document/update', {
      method: 'POST',
      body: JSON.stringify({
        layout: data,
        id: targetId,
        category: 'mapping',
      }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    if (!result) {
      message.error('error with save');
    } else {
      // location.reload();
      this.getTargetMapping();
    }
  };

  getTargetMapping = async () => {
    const targetId = this.props.match.params.id;
    const response = await fetch(`assets/mapping/${targetId}.json`);
    const dataSource = await response.json();
    const date = format(new Date(), 'a HH:mm:ss', {
      locale: zhCN,
    });
    message.success(`更新时间：${date}`);
    this.setState({ dataSource });
  };

  render() {
    const { dataSource } = this.state;
    return <MappingDetail dataSource={dataSource} onSave={this.handleOnSave} />;
  }
}
