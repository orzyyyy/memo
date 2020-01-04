import React, { useEffect, useState } from 'react';
import { MappingProps } from '../../server/controller/DocumentController';
import MainPageList from '../pages/MainPageList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import EditForm, { FormProps } from '../pages/EditForm';
import ExhentaiList, { handleExhentaiDownload } from './ExHentaiListDataController';
import { useResize } from '../hooks/useResize';
import { history } from '../router';
import { DocumentCategoryProps, SiderProps } from '../../server/utils/document';
import mapping from '../assets/mapping.json';
import menuData from '../assets/sider.json';
import UtilList from '../pages/UtilList';
import Header, { RightBarProps } from '../component/Header';
import MainPageContentWrapper from '../pages/MainPageContentWrapper';
import Footer from '../component/Footer';
import ExhentaiSearcher from '../pages/ExhentaiSearcher';

export interface MainPageDataControllerState {
  dataSource: MappingProps[];
  menuData: SiderProps[];
  EditForm: typeof EditForm;
  ExhentaiList: typeof ExhentaiList;
  formVisible: boolean;
  formLoading: boolean;
  formDataItem: FormProps | null;
  isExhentai: boolean;
  isLocal: boolean;
  exhentaiDateSet: string[];
  exhentaiListTargetDataSource: ExHentaiInfoItem[];
}

const headerHeight = 48;
const footerHeight = 91;

const dataSource = mapping
  .filter((item: any) => item.visible !== false)
  .sort((a: any, b: any) => b.createTime - a.createTime);

const handleExhentaiLoadList = () => {
  fetch('/api/memo/exhentai');
};

const handleListItemClick = ({ category, id }: { category: DocumentCategoryProps; id: string }) => {
  history.push(`./${category}/${id}`);
};

const getExhentaiTargetDataSource = async (url: string) => {
  const response = await fetch(url);
  const exhentaiListTargetDataSource = await response.json();
  return exhentaiListTargetDataSource;
};

const MainPageDataController = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formDataItem, setFormDataItem] = useState();
  const [isExhentai, setIsExhentai] = useState(false);
  const [isUtil, setIsUtil] = useState(false);
  const [exhentaiDateSet, setExhentaiDateSet] = useState([]);
  const [exhentaiListTargetDataSource, setExhentaiListTargetDataSource] = useState([] as ExHentaiInfoItem[]);
  const [siderSelectedKey, setSiderSelectedKey] = useState('all');
  const [pageInfo, setPageInfo] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line no-underscore-dangle
  const isLocal = (window as any).__isLocal;

  useResize();

  useEffect(() => {
    const getExhentaiDateSet = () => {
      fetch('/api/memo/exhentai/dateSet')
        .then(response => response.json())
        .then(exhentaiDateSet => {
          handleExhentaiSelectChange(exhentaiDateSet.length ? exhentaiDateSet[0] : '');
          setExhentaiDateSet(exhentaiDateSet);
        });
    };

    if (isLocal) {
      getExhentaiDateSet();
    }
  }, [isLocal]);

  const handleDelete = async ({ id, category }: MappingProps) => {
    await fetch('/api/memo/document/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id, category }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleEdit = (formDataItem?: any, visible?: boolean, pageInfo?: any) => {
    setPageInfo(pageInfo);
    setFormVisible(!!visible);
    setFormDataItem(formDataItem);
  };

  const handleSubmit = async (item: FormProps, dataItem?: MappingProps) => {
    setFormLoading(true);
    let id: string;
    if (dataItem && dataItem.id) {
      id = dataItem.id;
      await fetch('/api/memo/document/update/mapping', {
        body: JSON.stringify(Object.assign({}, dataItem, item)),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const response = await fetch('/api/memo/document/add', {
        body: JSON.stringify(item),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      id = await response.text();
    }
    handleModalCancel();
    if (item.category === 'mapping') {
      location.href = `./mapping/${id}`;
      return;
    }
    location.href = `./markdown-editor/${id}`;
  };

  const handleHeaderClick = (item: RightBarProps, e: React.MouseEvent) => {
    if (item.value === 'add') {
      handleEdit(undefined, true, { x: e.pageX, y: e.pageY });
      return;
    }
    setSiderSelectedKey(item.value);
    setIsExhentai(item.value === 'ex-hentai-module');
    setIsUtil(item.value === 'utils');
  };

  const handleHide = async ({ id }: MappingProps) => {
    await fetch('/api/memo/document/hide', {
      body: JSON.stringify({ id }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    alert('隐藏完成');
  };

  const handleModalCancel = () => {
    setFormVisible(false);
  };

  const renderContent = () => {
    if (isExhentai) {
      return <ExhentaiList dataSource={exhentaiListTargetDataSource} />;
    }
    if (isUtil) {
      return <UtilList />;
    }
    return (
      <MainPageList
        siderSelectedKey={siderSelectedKey}
        onListItemClick={handleListItemClick}
        onDelete={handleDelete}
        dataSource={dataSource as any}
        onEdit={handleEdit}
        onHide={handleHide}
        isLocal={isLocal}
        siderOpenKey="all"
      />
    );
  };

  const handleExhentaiSelectChange = async (value: string) => {
    const url = `./assets/exhentai/${value}.json`;
    const exhentaiListTargetDataSource: ExHentaiInfoItem[] = await getExhentaiTargetDataSource(url);
    setExhentaiListTargetDataSource(exhentaiListTargetDataSource);
  };

  return (
    <>
      <Header
        title="title"
        currentKey={siderSelectedKey}
        rightBar={[
          { text: '文章', value: 'all' },
          { text: 'ex-hentai', value: 'ex-hentai-module', visible: isLocal },
          { text: '工具', value: 'utils' },
          { text: '+', value: 'add', visible: isLocal },
        ]}
        onClick={handleHeaderClick}
        searchBar={
          <ExhentaiSearcher
            exhentaiDateSet={exhentaiDateSet}
            onExhentaiDownload={handleExhentaiDownload}
            onExhentaiLoadList={handleExhentaiLoadList}
            onExhentaiSelectChange={handleExhentaiSelectChange}
          />
        }
      />
      <MainPageContentWrapper height={document.body.clientHeight - footerHeight - headerHeight}>
        {renderContent()}
      </MainPageContentWrapper>
      <Footer />
      <EditForm
        visible={formVisible}
        selectData={menuData.filter((item: SiderProps) => item.children)}
        onSubmit={handleSubmit}
        onCancel={handleModalCancel}
        loading={formLoading}
        dataItem={formDataItem}
        pageInfo={pageInfo}
      />
    </>
  );
};

export default MainPageDataController;
