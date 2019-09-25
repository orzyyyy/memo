import React, { useEffect, useState } from "react";
import MainPage from "../pages/MainPage";
import { MappingProps } from "../../server/controller/DocumentController";
import MainPageList from "../pages/MainPageList";
import { message } from "antd";
import { SelectValue } from "antd/lib/select";
import { ExHentaiInfoItem } from "../../server/controller/ExhentaiController";
import EditForm, { FormProps } from "../pages/EditForm";
import ExhentaiList from "./ExHentaiListDataController";
import { useResize } from "../hooks/useResize";
import { history } from "../router";

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

const handleExhentaiDownload = (e: any) => {
  const url = e.target.value;
  fetch("exhentai/download", {
    body: JSON.stringify({ url }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.text())
    .then(result => result === "true" && message.success("保存完成"));
};

const handleExhentaiLoadList = () => {
  fetch("exhentai");
};

const handleListItemClick = ({
  category,
  id
}: {
  category: "mapping" | "markdown";
  id: string;
}) => {
  history.push(`./${category}/${id}`);
};

const getExhentaiTargetDataSource = async (url: string) => {
  const response = await fetch(url);
  const exhentaiListTargetDataSource = await response.json();
  return exhentaiListTargetDataSource;
};

const MainPageDataController = () => {
  const [dataSource, setDataSource] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formDataItem, setFormDataItem] = useState();
  const [isExhentai, setIsExhentai] = useState(false);
  const [exhentaiDateSet, setExhentaiDateSet] = useState([]);
  const [
    exhentaiListTargetDataSource,
    setExhentaiListTargetDataSource
  ] = useState([]);
  const [siderOpenKey, setSiderOpenKey] = useState("all");
  const [siderSelectedKey, setSiderSelectedKey] = useState("all");
  // eslint-disable-next-line no-underscore-dangle
  const isLocal = (window as any).__isLocal;

  useResize();

  useEffect(() => {
    if (isLocal) {
      getExhentaiDateSet();
    }
    getSider();
    getMapping();
  }, []);

  const getExhentaiDateSet = () => {
    fetch("/exhentai/dateSet")
      .then(response => response.json())
      .then(exhentaiDateSet => {
        handleExhentaiSelectChange(
          exhentaiDateSet.length ? exhentaiDateSet[0] : ""
        );
        setExhentaiDateSet(exhentaiDateSet);
      });
  };

  const getMapping = async () => {
    const response = await fetch("./assets/mapping.json");
    const dataSource = await response.json();
    setDataSource(
      dataSource
        .filter((item: MappingProps) => item.visible !== false)
        .sort((a: any, b: any) => b.modifyTime - a.modifyTime)
    );
  };

  const getSider = async () => {
    const response = await fetch("./assets/sider.json");
    const menuData = await response.json();
    setMenuData(menuData);
  };

  const handleDelete = async ({ id, category }: MappingProps) => {
    const response = await fetch("/document/delete", {
      method: "DELETE",
      body: JSON.stringify({ id, category }),
      mode: "cors",
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    if (!result) {
      console.error("error with delete");
    } else {
      getMapping();
    }
  };

  const handleEdit = (formDataItem?: any, visible?: boolean) => {
    setFormVisible(!!visible);
    setFormDataItem(formDataItem);
  };

  const handleSubmit = async (item: FormProps, dataItem?: any) => {
    if (!item && !dataItem) {
      return;
    }
    setFormLoading(true);
    let id: string;
    if (dataItem && dataItem.id) {
      id = dataItem.id;
      await fetch("document/update", {
        body: JSON.stringify(Object.assign({}, dataItem, item)),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      message.success(`${item.category} 更新完成`);
    } else {
      const response = await fetch("document/add", {
        body: JSON.stringify(item),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      id = await response.text();
      message.success(`${item.category} 初始化完成`);
    }
    handleModalCancel();
    if (item.category === "mapping") {
      location.href = `./mapping/${id}`;
      return;
    }
    location.href = `./markdown-editor/${id}`;
  };

  const handleHide = async ({ id }: MappingProps) => {
    await fetch("document/hide", {
      body: JSON.stringify({ id }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    getSider();
    getMapping();
    message.success("隐藏完成");
  };

  const handleModalCancel = () => {
    setFormVisible(false);
  };

  const renderContent = () => {
    if (isExhentai && ExhentaiList) {
      return <ExhentaiList dataSource={exhentaiListTargetDataSource} />;
    }
    return (
      <MainPageList
        siderSelectedKey={siderSelectedKey}
        onListItemClick={handleListItemClick}
        onDelete={handleDelete}
        dataSource={dataSource}
        onEdit={handleEdit}
        onHide={handleHide}
      />
    );
  };

  const handleMenuClick = (keyPath: string[]) => {
    setSiderOpenKey(keyPath[1]);
    setSiderSelectedKey(keyPath[0]);
    setIsExhentai(keyPath.length === 1 && keyPath[0] === "ex-hentai-module");
  };

  const handleExhentaiSelectChange = async (value: SelectValue) => {
    const url = `./assets/exhentai/${value}.json`;
    const exhentaiListTargetDataSource: any = await getExhentaiTargetDataSource(
      url
    );
    setExhentaiListTargetDataSource(exhentaiListTargetDataSource);
  };

  return (
    <>
      <MainPage
        onMenuClick={handleMenuClick}
        menuData={menuData}
        onExhentaiDownload={handleExhentaiDownload}
        renderContent={renderContent}
        isLocal={isLocal}
        exhentaiDateSet={exhentaiDateSet}
        onExhentaiSelectChange={handleExhentaiSelectChange}
        onEdit={handleEdit}
        siderOpenKey={siderOpenKey}
        siderSelectedKey={siderSelectedKey}
        onExhentaiLoadList={handleExhentaiLoadList}
      />
      <EditForm
        visible={formVisible}
        selectData={menuData.filter((item: any) => item.children)}
        onSubmit={handleSubmit}
        onCancel={handleModalCancel}
        loading={formLoading}
        dataItem={formDataItem}
      />
    </>
  );
};

export default MainPageDataController;
