import React, { Component } from 'react';
import './css/MainPage.css';
import { Dropdown, Menu, Layout, Breadcrumb, List, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
import { SiderProps } from '../controller/MainPageDataController';
import { MappingProps } from '../../server/controller/DocumentController';
import { format } from 'date-fns';

export interface MainPageProps {
  dataSource: MappingProps[];
  onEdit: (dataItem?: any) => void;
  onDelete?: (dataItem: MappingProps) => void;
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
    if (menuData.length > 0 && !siderSelectedKey) {
      return {
        siderOpenKey: menuData[0].title,
        siderSelectedKey: menuData[0].title,
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
    const { siderSelectedKey } = this.state;
    return (
      <Sider theme="light">
        <Menu
          selectedKeys={[siderSelectedKey]}
          mode="inline"
          onClick={this.handleMenuClick}
        >
          {menuData.map((item: any) => {
            const { key, title, children } = item;
            if (!children) {
              return <Menu.Item key={key}>{title}</Menu.Item>;
            }
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

  handleListItemClick = ({
    category,
    id,
  }: {
    category: 'mapping' | 'markdown';
    id: string;
  }) => {
    location.hash = `/${category}/${id}`;
  };

  renderContent = () => {
    const { dataSource, onDelete, onEdit } = this.props;
    const { siderOpenKey, siderSelectedKey } = this.state;

    const wrapperHeight = document.body.clientHeight - 21 - 90 - 24;
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{siderOpenKey}</Breadcrumb.Item>
          <Breadcrumb.Item>{siderSelectedKey}</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          style={{ position: 'absolute', right: 88, top: 10 }}
          onClick={() => (location.hash = '/exhentai')}
          type="danger"
        >
          <Icon type="alert" />
        </Button>
        <Button
          style={{ position: 'absolute', right: 24, top: 10 }}
          onClick={() => onEdit()}
        >
          <Icon type="plus" />
        </Button>
        <div
          style={{
            padding: 24,
            background: '#fff',
            height: wrapperHeight,
            overflow: 'auto',
          }}
        >
          <List
            dataSource={
              siderSelectedKey === 'all'
                ? dataSource
                : dataSource.filter(item => item.subType === siderSelectedKey)
            }
            renderItem={(item: any) => (
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item
                      key={`add-${item.id}`}
                      onClick={() => onEdit(item)}
                    >
                      修改
                    </Menu.Item>
                    <Menu.Item
                      key={`delete-${item.id}`}
                      onClick={() => onDelete && onDelete(item)}
                    >
                      删除
                    </Menu.Item>
                  </Menu>
                )}
                trigger={['contextMenu']}
                key={`fragment-${item.id}`}
              >
                <List.Item
                  className="list-item"
                  onClick={() =>
                    this.handleListItemClick({
                      category: item.category,
                      id: item.id,
                    })
                  }
                >
                  {item.category === 'mapping' && (
                    <Icon
                      type="apartment"
                      style={{
                        marginRight: 10,
                        fontSize: 16,
                        color: '#108ee9',
                      }}
                    />
                  )}
                  {item.category === 'markdown' && (
                    <Icon
                      type="file-markdown"
                      style={{
                        marginRight: 10,
                        fontSize: 16,
                        color: '#87d068',
                      }}
                    />
                  )}
                  {item.title}
                  <div style={{ float: 'right', marginRight: 8 }}>
                    {`${format(
                      new Date(item.createTime),
                      'yyyy-MM-dd',
                    )} / ${format(new Date(item.modifyTime), 'yyyy-MM-dd')}`}
                  </div>
                </List.Item>
              </Dropdown>
            )}
          />
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
