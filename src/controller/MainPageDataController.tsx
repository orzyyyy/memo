import React, { Component } from 'react';
import MainPage from '../pages/MainPage';
import { MappingProps } from '../../server/controller/DocumentController';
import { FormProps } from '../pages/EditForm';
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
  formDataItem: FormProps | null;
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
    formDataItem: null,
  };

  componentDidMount = () => {
    this.getSider();
    this.getMapping();
  };

  getMapping = async () => {
    const response = await fetch('./assets/mapping.json');
    const dataSource = await response.json();
    this.setState({
      dataSource: dataSource.sort(
        (a: any, b: any) => b.modifyTime - a.modifyTime,
      ),
    });
  };

  getSider = async () => {
    const response = await fetch('./assets/sider.json');
    const menuData = await response.json();
    this.setState({ menuData });
  };

  handleDelete = async ({ id, category }: { id: string; category: string }) => {
    const response = await fetch('/document/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id, category }),
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

  handleEdit = (formDataItem?: any) => {
    import('../pages/EditForm').then(EditForm => {
      this.setState({
        formVisible: true,
        EditForm: EditForm.default || EditForm,
        formDataItem,
      });
    });
  };

  handleSubmit = async (item: FormProps, dataItem?: any) => {
    this.setState({ formLoading: true });
    let id;
    if (dataItem) {
      id = dataItem.id;
      await fetch('document/update', {
        body: JSON.stringify(Object.assign({}, dataItem, item)),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      message.success(`${item.category} 更新完成`);
    } else {
      const response = await fetch('document/add', {
        body: JSON.stringify(item),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      id = await response.text();
      message.success(`${item.category} 初始化完成`);
    }
    this.handleModalCancel();
    location.hash = `/${item.category}${
      item.category === 'markdown' ? '/edit' : ''
    }/${id}`;
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
      formDataItem,
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
            dataItem={formDataItem}
          />
        )}
      </>
    );
  };
}
