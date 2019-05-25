import React, { Component } from 'react';
import { ajax } from '../urlHelper';
import MainPage from './MainPage';
import { MappingItem } from '../router';

export interface MainPageDataControllerState {
  dataSource: Array<MappingItem>;
}

export default class MainPageDataController extends Component<
  any,
  MainPageDataControllerState
> {
  state = {
    dataSource: [],
  };

  componentDidMount = () => {
    this.getMapping();
  };

  getMapping = async () => {
    const response = await fetch('./assets/mapping.json');
    const dataSource = await response.json();
    this.setState({ dataSource });
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
    const { dataSource } = this.state;
    return (
      <MainPage
        dataSource={dataSource}
        onSave={this.handleAdd}
        onDelete={this.handleDelete}
      />
    );
  };
}
