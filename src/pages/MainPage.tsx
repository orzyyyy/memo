import React, { Component } from 'react';
import './css/MainPage.css';
import { Menu, Layout } from 'antd';
const { SubMenu } = Menu;
const { Content, Footer, Sider, Header } = Layout;
import { SiderProps } from '../controller/MainPageDataController';
import { MappingProps } from '../../server/controller/DocumentController';

export interface MainPageProps {
  dataSource: MappingProps[];
  onEdit: (dataItem?: any) => void;
  onDelete?: (dataItem: any) => void;
  menuData: SiderProps[];
  onExhentaiDownload: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  renderContent?: (
    props: MainPageProps,
    state: MainPageState,
    event?: any,
  ) => React.ReactNode;
  onMenuClick: (keyPath: string[]) => void;
  onListItemClick: ({
    category,
    id,
  }: {
    category: 'mapping' | 'markdown';
    id: string;
  }) => void;
  isLocal: boolean;
}
export interface MainPageState {
  siderOpenKey: string;
  siderSelectedKey: string;
  DynamicHeader: any;
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
    DynamicHeader: null,
  };

  async componentDidMount() {
    window.onresize = () => this.setState({});
  }

  async componentDidUpdate() {
    if (this.props.isLocal && !this.state.DynamicHeader) {
      const DynamicHeader: any = await this.loadHeader();
      this.setState({ DynamicHeader });
    }
  }

  loadHeader = async () =>
    await import('./MainPageHeader').then(({ default: MainPageHeader }) => (
      <MainPageHeader Header={Header} {...this.props} />
    ));

  handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    this.props.onMenuClick(keyPath);
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

  renderContent = () => {
    const { renderContent, isLocal } = this.props;
    const headerHeight = isLocal ? 48 : 0;
    const wrapperHeight = document.body.clientHeight - 90 - headerHeight;
    return (
      <Content style={{ marginLeft: 8 }}>
        <div
          style={{
            padding: '8px 16px 8px 8px',
            background: '#fff',
            height: wrapperHeight,
            overflow: 'auto',
          }}
          className="main-page-content-wrapper"
        >
          {renderContent && renderContent(this.props, this.state)}
        </div>
      </Content>
    );
  };

  renderFooter = () => (
    <Footer style={{ textAlign: 'center' }}>
      <div>
        你睡了一下午，醒的时候屋子里黑漆漆、一点声音都没有。抬头望望窗外，天还没完全黑。四处摸了摸，在枕头下找到手机。打开后屏幕亮起，干净，没有一条消息
      </div>
      <div>
        打开电脑，打开 github。pull request 写得很菜，连 core
        都在喷你，但忽然就不孤独了
      </div>
    </Footer>
  );

  renderHeader = () => {
    return this.state.DynamicHeader;
  };

  render = () => (
    <Layout className="MainPage">
      {this.renderSider()}
      <Layout>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </Layout>
    </Layout>
  );
}
