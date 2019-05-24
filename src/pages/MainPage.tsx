import React, { Component } from 'react';
import './css/MainPage.css';
import { Card, Dropdown, Menu, Icon, Layout, Breadcrumb, Tooltip } from 'antd';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
import { defaultSelectedKeys, defaultOpenKeys, menu } from '../options/menu';
import { MappingItem } from '../router';

export interface MainPageProps {
  dataSource: Array<MappingItem>;
  onSave?: () => void;
  onDelete?: (dataItem: MappingItem) => void;
}
export interface MainPageState {
  breadParent: string;
  breadChild: string;
}

export default class MainPage extends Component<MainPageProps, MainPageState> {
  state: MainPageState = {
    breadParent: defaultOpenKeys,
    breadChild: defaultSelectedKeys,
  };

  handleClick = ({ id }: { id: string }) => {
    location.hash = `/${id}`;
  };

  handleMenuClick = ({ keyPath }: { keyPath: Array<string> }) => {
    this.setState({
      breadChild: keyPath[0],
      breadParent: keyPath[1],
    });
  };

  renderSider = () => (
    <Sider collapsible theme="light">
      <Menu
        defaultSelectedKeys={[defaultSelectedKeys]}
        defaultOpenKeys={[defaultOpenKeys]}
        mode="inline"
        onClick={this.handleMenuClick}
      >
        {menu.map(item => {
          const { key, title, children } = item;
          return (
            <SubMenu key={key} title={title}>
              {children.map(jtem => (
                <Menu.Item key={jtem.key}>{jtem.value}</Menu.Item>
              ))}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );

  renderContent = () => {
    const { dataSource, onSave, onDelete } = this.props;
    const { breadParent, breadChild } = this.state;
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{breadParent}</Breadcrumb.Item>
          <Breadcrumb.Item>{breadChild}</Breadcrumb.Item>
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
