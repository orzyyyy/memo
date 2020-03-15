import React, { useEffect, useState } from 'react';
import { MappingProps } from '../../server/controller/DocumentController';
import MainPageList from '../pages/MainPageList';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import EditForm, { FormProps } from '../pages/EditForm';
import ExhentaiList, { handleExhentaiDownload } from './ExHentaiListDataController';
import { useResize } from '../hooks/useResize';
import { history } from '../router';
import { DocumentCategoryProps, SiderProps } from '../../server/utils/document';
import UtilList from '../pages/UtilList';
import Header, { RightBarProps } from '../component/Header';
import MainPageContentWrapper from '../pages/MainPageContentWrapper';
import Footer from '../component/Footer';
import ExhentaiSearcher from '../pages/ExhentaiSearcher';
let rightBar = require('../assets/rightBar.json');

const neta = [
  '我裤子动了',
  '医生那边怎么说？',
  '嫁了算了，这傻逼看起来还行',
  '几日不见，胖若两人',
  '经过组织讨论，决定要有光',
  '引人入射的爱情故事',
  '脚踏板轮椅，蓝色品质，50 一辆，童叟无欺',
  '走，网吧通宵',
  '太惨了，vtuber 就算哭也只能捕捉出笑脸',
  '有的人明明多穿了一件，却感觉少了一件',
];
const title = neta[Math.round(Math.random() * 100) % neta.length];

// eslint-disable-next-line no-underscore-dangle
const isLocal = (window as any).__isLocal;

rightBar = rightBar.map((item: { text: string; value: string; visible?: boolean }) => {
  if (item.value === 'add' || item.value === 'ex-hentai') {
    item.visible = !!isLocal;
  }
  return item;
});

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

const isGhPages = location.pathname.includes('memo');
const prefix = isGhPages ? location.pathname.split('/')[2] : location.pathname.split('/')[1];
const ghPagesPrefix = isGhPages ? '/memo' : '';

const headerHeight = 48;
const footerHeight = 91;

const handleExhentaiLoadList = () => {
  fetch('/api/memo/exhentai/list/latest');
};

const handleListItemClick = ({ category, id, key }: { category: DocumentCategoryProps; id: string; key?: string }) => {
  history.replace(`${ghPagesPrefix}/${category}/${key ? key : id}`);
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
  const [exhentaiDateSet, setExhentaiDateSet] = useState([]);
  const [exhentaiListTargetDataSource, setExhentaiListTargetDataSource] = useState([] as ExHentaiInfoItem[]);
  const [siderSelectedKey] = useState(prefix || 'article');
  const [pageInfo, setPageInfo] = useState({ x: 0, y: 0 });
  const [mapping, setMapping] = useState([]);
  const [menuData, setMenuData] = useState([]);

  const dataSource = mapping
    .filter((item: any) => item.visible !== false)
    .sort((a: any, b: any) => b.createTime - a.createTime) as MappingProps[];

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

    const getMappingData = () => {
      fetch('./assets/mapping.json')
        .then(response => response.json())
        .then(setMapping);
    };

    const getMenuData = () => {
      fetch('./assets/sider.json')
        .then(response => response.json())
        .then(setMenuData);
    };

    getMappingData();

    if (isLocal) {
      getExhentaiDateSet();
      getMenuData();
    }
  }, []);

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
    switch (item.category) {
      case 'mapping':
        history.replace(`${ghPagesPrefix}/mapping/${id}`);
        break;

      case 'markdown':
        history.replace(`${ghPagesPrefix}/markdown-editor/${id}`);
        break;

      case 'utils':
        history.replace(`${ghPagesPrefix}/utils/${id}`);
        break;

      default:
        break;
    }
  };

  const handleHeaderClick = (item: RightBarProps, e: React.MouseEvent) => {
    if (item.value === 'add') {
      handleEdit(undefined, true, { x: e.pageX, y: e.pageY });
      return;
    }
    // This line will cause stuck when toggling with the nav
    // Have worked on this for my afternoon, but can't find a way to fix
    // history.replace(`${ghPagesPrefix}/${item.value}`);
    // Use this to hack
    location.href = `${ghPagesPrefix}/${item.value}`;
    // setSiderSelectedKey(item.value);
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
    if (siderSelectedKey === 'ex-hentai') {
      return <ExhentaiList isLocal={isLocal} dataSource={exhentaiListTargetDataSource} />;
    }
    if (siderSelectedKey === 'utils') {
      return (
        <UtilList
          dataSource={dataSource.filter(item => item.category === 'utils')}
          onListItemClick={handleListItemClick}
        />
      );
    }
    return (
      <MainPageList
        siderSelectedKey={siderSelectedKey}
        onListItemClick={handleListItemClick}
        onDelete={handleDelete}
        dataSource={dataSource.filter(item => item.category !== 'utils')}
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
        title={title}
        currentKey={siderSelectedKey}
        rightBar={rightBar}
        onClick={handleHeaderClick}
        searchBar={
          isLocal ? (
            <ExhentaiSearcher
              exhentaiDateSet={exhentaiDateSet}
              onExhentaiDownload={handleExhentaiDownload}
              onExhentaiLoadList={handleExhentaiLoadList}
              onExhentaiSelectChange={handleExhentaiSelectChange}
            />
          ) : null
        }
      />
      <MainPageContentWrapper height={document.documentElement.clientHeight - footerHeight - headerHeight}>
        {renderContent()}
      </MainPageContentWrapper>
      <Footer />
      <EditForm
        visible={formVisible}
        selectData={menuData.filter((item: SiderProps) => item.children)}
        onSubmit={handleSubmit}
        onCancel={handleModalCancel}
        loading={formLoading}
        dataItem={formDataItem as any}
        pageInfo={pageInfo}
      />
    </>
  );
};

export default MainPageDataController;
