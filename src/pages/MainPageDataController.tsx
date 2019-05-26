import React, { Component } from 'react';
import { ajax } from '../urlHelper';
import MainPage from './MainPage';
import { MappingProps } from '../../server/controller/save';
import { FormProps } from './EditForm';

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

  handleSave = () => {
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

  handleEdit = () => {
    import('./EditForm').then(EditForm => {
      this.setState({
        formVisible: true,
        EditForm: EditForm.default || EditForm,
      });
    });
  };

  handleSubmit = async (item: FormProps) => {
    const response = await fetch('save/new', {
      body: JSON.stringify(item),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    await response.json();
  };

  handleModalCancel = () => {
    this.setState({ formVisible: false });
  };

  render = () => {
    const { dataSource, menuData, EditForm, formVisible } = this.state;
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
            cascaderData={menuData}
            onSubmit={this.handleSubmit}
            onCancel={this.handleModalCancel}
          />
        )}
      </>
    );
  };
}
