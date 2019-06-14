import React, { Component } from 'react';
import ExHentaiList from '../pages/ExHentaiList';
import { ExHentaiInfoItem } from '../../server/controller/get';

export interface ExHentaiListDataControllerState {
  dataSource: ExHentaiInfoItem[];
}

export default class ExHentaiListDataController extends Component<
  any,
  ExHentaiListDataControllerState
> {
  state = {
    dataSource: [],
  };

  componentDidMount = async () => {
    const lastestSet = await this.getExHentaiLastestSet();
    const dataSource = await this.getExHentaiData(lastestSet);
    this.setState({ dataSource });
  };

  getExHentaiLastestSet = async () => {
    const response = await fetch('/exhentai/getLastestSet');
    return await response.text();
  };

  getExHentaiData = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  render() {
    return <ExHentaiList dataSource={this.state.dataSource} />;
  }
}
