import React, { Component } from 'react';
import './css/MainPage.css';
import { Card, Dropdown, Menu, Icon, Layout, Breadcrumb, Tooltip } from 'antd';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
import { MappingItem } from '../router';
import { SiderProps } from './MainPageDataController';

export interface MainPageProps {
  dataSource: MappingItem[];
  onSave?: () => void;
  onDelete?: (dataItem: MappingItem) => void;
  menuData: SiderProps[];
}
export interface MainPageState {
  siderOpenKey: string;
  siderSelectedKey: string;
}

export default class MainPage extends Component<MainPageProps, MainPageState> {
  static getDerivedStateFromProps(
    prevProps: MainPageProps,
    prevState: MainPageState,
  ) {
    const { menuData } = prevProps;
    const { siderSelectedKey } = prevState;
    if (
      menuData.length > 0 &&
      menuData[0].children.length > 0 &&
      !siderSelectedKey
    ) {
      return {
        siderOpenKey: menuData[0].title,
        siderSelectedKey: menuData[0].children[0].value,
      };
    }
    return null;
  }
  state: MainPageState = {
    siderOpenKey: '',
    siderSelectedKey: '',
  };

  handleClick = ({ id }: { id: string }) => {
    location.hash = `/${id}`;
  };

  handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    this.setState({
      siderOpenKey: keyPath[1],
      siderSelectedKey: keyPath[0],
    });
  };

  renderSider = () => {
    const { menuData } = this.props;
    const { siderOpenKey, siderSelectedKey } = this.state;
    return (
      <Sider collapsible theme="light">
        <Menu
          selectedKeys={[siderSelectedKey]}
          openKeys={[siderOpenKey]}
          mode="inline"
          onClick={this.handleMenuClick}
        >
          {menuData.map((item: any) => {
            const { key, title, children } = item;
            return (
              <SubMenu key={key} title={title}>
                {children.map((jtem: any) => (
                  <Menu.Item key={jtem.key}>{jtem.value}</Menu.Item>
                ))}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    );
  };

  renderContent = () => {
    const { dataSource, onSave, onDelete } = this.props;
    const { siderOpenKey, siderSelectedKey } = this.state;
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{siderOpenKey}</Breadcrumb.Item>
          <Breadcrumb.Item>{siderSelectedKey}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
          {dataSource.length === 0 && (
            <div onClick={onSave} className="card-grid-wrapper">
              <Card.Grid className="card add">
                <Icon type="plus" />
              </Card.Grid>
            </div>
          )}
          {dataSource.map(item => {
            const { thumbnailUrl, id, hoverText } = item;
            const dropDownMenu = (
              <Menu>
                <Menu.Item key={`add-${id}`} onClick={onSave}>
                  新增
                </Menu.Item>
                <Menu.Item
                  key={`delete-${id}`}
                  onClick={() => onDelete && onDelete(item)}
                >
                  删除
                </Menu.Item>
              </Menu>
            );
            return (
              <Tooltip title={hoverText} key={`fragment-${id}`}>
                <Card.Grid className="card">
                  <Dropdown overlay={dropDownMenu} trigger={['contextMenu']}>
                    <img
                      src={thumbnailUrl}
                      onClick={() => this.handleClick(item)}
                    />
                  </Dropdown>
                </Card.Grid>
              </Tooltip>
            );
          })}
        </div>
      </Content>
    );
  };

  renderFooter = () => (
    <Footer style={{ textAlign: 'center' }}>
      <div>
        你睡了一下午，醒的时候屋子里黑漆漆，一点声音都没有。抬头望了望窗外，天还没完全黑。四处摸了摸，在枕头下找到手机，打开后屏幕亮起，干净，没有一条信息
      </div>
      <div>
        打开电脑，打开 github。pull request 写得很菜，collaborators
        都在喷你，但忽然就不孤独了
      </div>
    </Footer>
  );

  render = () => (
    <Layout className="MainPage">
      {this.renderSider()}
      <Layout>
        {this.renderContent()}
        {this.renderFooter()}
      </Layout>
    </Layout>
  );
}
