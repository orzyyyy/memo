import React, { Component } from 'react';
import MainPage from './MainPage';
import { MappingProps } from '../../server/controller/save';
import { FormProps } from './EditForm';
import { message } from 'antd';

export interface SiderProps {
  key: string;
  title?: string;
  children?: { key: string; value: string }[];
}
export interface MainPageDataControllerState {
  dataSource: MappingProps[];
  menuData: SiderProps[];
  EditForm: any;
  formVisible: boolean;
  formLoading: boolean;
}

export default class MainPageDataController extends Component<
  any,
  MainPageDataControllerState
> {
  state: MainPageDataControllerState = {
    dataSource: [],
    menuData: [],
    EditForm: null,
    formVisible: false,
    formLoading: false,
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

  handleDelete = async ({ id }: { id: string }) => {
    const response = await fetch('/del/mapping', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    if (!result) {
      console.error('error with delete');
    } else {
      this.getMapping();
    }
  };

  handleEdit = () => {
    import('./EditForm').then(EditForm => {
      this.setState({
        formVisible: true,
        EditForm: EditForm.default || EditForm,
      });
    });
  };

  handleSubmit = async (item: FormProps) => {
    this.setState({ formLoading: true });
    const response = await fetch('save/new', {
      body: JSON.stringify(item),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const id = await response.text();
    message.success(`${item.category} 初始化完成`);
    this.handleModalCancel();
    location.hash = `/${item.category}/edit/${id}`;
  };

  handleModalCancel = () => {
    this.setState({ formVisible: false });
  };

  render = () => {
    const {
      dataSource,
      menuData,
      EditForm,
      formVisible,
      formLoading,
    } = this.state;
    return (
      <>
        <MainPage
          dataSource={dataSource}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          menuData={menuData}
        />
        {EditForm && (
          <EditForm
            visible={formVisible}
            selectData={menuData.filter(item => item.children)}
            onSubmit={this.handleSubmit}
            onCancel={this.handleModalCancel}
            loading={formLoading}
          />
        )}
      </>
    );
  };
}
