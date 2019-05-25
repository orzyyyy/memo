import React, { Component } from 'react';
import { ajax } from '../urlHelper';
import MainPage from './MainPage';
import { MappingItem } from '../router';

export interface SiderProps {
  key: string;
  title?: string;
  children?: { key: string; value: string }[];
}
export interface MainPageDataControllerState {
  dataSource: MappingItem[];
  menuData: SiderProps[];
}

export default class MainPageDataController extends Component<
  any,
  MainPageDataControllerState
> {
  state: MainPageDataControllerState = {
    dataSource: [],
    menuData: [],
  };

  componentDidMount = () => {
    this.getSider();
    this.getMapping();
  };

  getMapping = async () => {
    const response = await fetch('./assets/mapping.json');
    const dataSource = await response.json();
    this.setState({ dataSource });
  };

  getSider = async () => {
    const response = await fetch('./assets/sider.json');
    const menuData = await response.json();
    this.setState({ menuData });
  };

  handleDelete = ({ id }: { id: string }) => {
    ajax({
      url: 'del',
      params: {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      },
      success: result => {
        if (!result) {
          console.error('error with delete');
        } else {
          (window as any).DataCollector.clear();
          this.getMapping();
        }
      },
    });
  };

  handleAdd = () => {
    ajax({
      url: 'save/new',
      type: 'text',
      params: {
        method: 'POST',
        body: '',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      },
      success: result => {
        if (result) {
          location.hash = '/new?' + result;
        }
      },
    });
  };

  render = () => {
    const { dataSource, menuData } = this.state;
    return (
      <MainPage
        dataSource={dataSource}
        onSave={this.handleAdd}
        onDelete={this.handleDelete}
        menuData={menuData}
      />
    );
  };
}
