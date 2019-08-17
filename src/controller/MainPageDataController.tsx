import React, { Component } from 'react';
import MainPage, { MainPageProps, MainPageState } from '../pages/MainPage';
import { MappingProps } from '../../server/controller/DocumentController';
import { FormProps } from '../pages/EditForm';
import MainPageList from '../pages/MainPageList';
import { message } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';

export interface SiderProps {
  key: string;
  title?: string;
  children?: { key: string; value: string }[];
}
export interface MainPageDataControllerState {
  dataSource: MappingProps[];
  menuData: SiderProps[];
  EditForm: any;
  ExhentaiList: any;
  formVisible: boolean;
  formLoading: boolean;
  formDataItem: FormProps | null;
  isExhentai: boolean;
  isLocal: boolean;
  exhentaiDateSet: string[];
  exhentaiListTargetDataSource: ExHentaiInfoItem[];
}

const bindSocket = () => {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
};

export default class MainPageDataController extends Component<
  any,
  MainPageDataControllerState
> {
  state: MainPageDataControllerState = {
    dataSource: [],
    menuData: [],
    EditForm: null,
    ExhentaiList: null,
    formVisible: false,
    formLoading: false,
    formDataItem: null,
    isExhentai: false,
    isLocal: false,
    exhentaiDateSet: [],
    exhentaiListTargetDataSource: [],
  };

  componentDidMount = () => {
    this.checkLocalStatus(this.getExhentaiDateSet);
    this.getSider();
    this.getMapping();
  };

  checkLocalStatus = (callback?: () => void) => {
    fetch('/test')
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error();
      })
      .then(() => {
        bindSocket();
        this.setState({ isLocal: true }, () => callback && callback());
      })
      .catch();
  };

  getExhentaiDateSet = () => {
    fetch('/exhentai/dateSet')
      .then(response => response.json())
      .then(exhentaiDateSet => {
        this.handleExhentaiSelectChange(
          exhentaiDateSet.length ? exhentaiDateSet[0] : '',
        );
        this.setState({ exhentaiDateSet });
      });
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
    if (!item && !dataItem) {
      return;
    }
    this.setState({ formLoading: true });
    let id: string;
    if (dataItem && dataItem.id) {
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

  handleExhentaiDownload = (e: any) => {
    const url = e.target.value;
    fetch('exhentai/download', {
      body: JSON.stringify({ url }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.text())
      .then(result => result === 'true' && message.success('保存完成'));
  };

  renderContent = (
    mainPageProps: MainPageProps,
    mainPageState: MainPageState,
  ) => {
    const {
      isExhentai,
      ExhentaiList,
      exhentaiListTargetDataSource,
    } = this.state;
    if (isExhentai && ExhentaiList) {
      return <ExhentaiList dataSource={exhentaiListTargetDataSource} />;
    }
    return <MainPageList props={mainPageProps} state={mainPageState} />;
  };

  handleMenuClick = async (keyPath: string[]) => {
    this.setState({
      isExhentai: keyPath.length === 1 && keyPath[0] === 'ex-hentai-module',
    });
    if (!this.state.ExhentaiList) {
      await import('./ExHentaiListDataController').then(target => {
        this.setState({
          ExhentaiList: target.default,
        });
      });
    }
  };

  handleListItemClick = ({
    category,
    id,
  }: {
    category: 'mapping' | 'markdown';
    id: string;
  }) => {
    location.hash = `/${category}/${id}`;
  };

  handleExhentaiSelectChange = async (value: SelectValue) => {
    const url = `./assets/exhentai/${value}.json`;
    const exhentaiListTargetDataSource: ExHentaiInfoItem[] = await this.getExhentaiTargetDataSource(
      url,
    );
    this.setState({ exhentaiListTargetDataSource });
  };

  getExhentaiTargetDataSource = async (url: string) => {
    const response = await fetch(url);
    const exhentaiListTargetDataSource = await response.json();
    return exhentaiListTargetDataSource;
  };

  render = () => {
    const {
      dataSource,
      menuData,
      EditForm,
      formVisible,
      formLoading,
      formDataItem,
      isLocal,
      exhentaiDateSet,
    } = this.state;
    return (
      <>
        <MainPage
          dataSource={dataSource}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onMenuClick={this.handleMenuClick}
          menuData={menuData}
          onExhentaiDownload={this.handleExhentaiDownload}
          renderContent={this.renderContent}
          onListItemClick={this.handleListItemClick}
          isLocal={isLocal}
          exhentaiDateSet={exhentaiDateSet}
          onExhentaiSelectChange={this.handleExhentaiSelectChange}
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
