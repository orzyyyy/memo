import React, { Component } from "react";
import "../assets/MainPage.css";
import { ajax } from "../urlHelper";
import { Card, Dropdown, Menu, Icon, Layout, Breadcrumb, Tooltip } from "antd";
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
import { defaultSelectedKeys, defaultOpenKeys, menu } from "../options/menu";

export interface MainPageState {
  data: Array<any>;
  breadParent: string;
  breadChild: string;
}

export default class MainPage extends Component<any, MainPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      breadParent: defaultOpenKeys,
      breadChild: defaultSelectedKeys
    };
  }

  componentDidMount = () => {
    this.getMapping();
  };

  getMapping = () => {
    ajax({
      url: "dist/mapping.json",
      success: data => this.setState({ data })
    });
  };

  handleClick = ({ id }: { id: string }) => {
    location.hash = `/${id}`;
  };

  handleDelete = ({ id }: { id: string }) => {
    ajax({
      url: "del",
      params: {
        method: "DELETE",
        body: JSON.stringify({ id }),
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      },
      success: result => {
        if (!result) {
          console.error("error with delete");
        } else {
          (window as any).DataCollector.clear();
          this.getMapping();
        }
      }
    });
  };

  handleAdd = () => {
    ajax({
      url: "save/new",
      type: "text",
      params: {
        method: "POST",
        body: "",
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      },
      success: result => {
        if (result) {
          location.hash = "/new?" + result;
        }
      }
    });
  };

  handleMenuClick = ({ keyPath }: { keyPath: Array<string> }) => {
    this.setState({
      breadChild: keyPath[0],
      breadParent: keyPath[1]
    });
  };

  generateMainPage = () => {
    const { data, breadParent, breadChild } = this.state;

    if (data.length == 0) {
      return (
        <Card.Grid className="card add" onClick={this.handleAdd}>
          <Icon type="plus" />
        </Card.Grid>
      );
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
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
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{breadParent}</Breadcrumb.Item>
              <Breadcrumb.Item>{breadChild}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
              {data.map(item => {
                const { thumbnailUrl, id, hoverText } = item;
                const menu = (
                  <Menu>
                    <Menu.Item key={`add-${id}`} onClick={this.handleAdd}>
                      新增
                    </Menu.Item>
                    <Menu.Item
                      key={`delete-${id}`}
                      onClick={() => this.handleDelete(item)}
                    >
                      删除
                    </Menu.Item>
                  </Menu>
                );
                return (
                  <Tooltip title={hoverText} key={`fragment-${id}`}>
                    <Card.Grid className="card">
                      <Dropdown overlay={menu} trigger={["contextMenu"]}>
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
          <Footer style={{ textAlign: "center" }}>
            <div>
              你睡了一下午，醒的时候屋子里黑漆漆，一点声音都没有。抬头望了望窗外，天还没完全黑。四处摸了摸，在枕头下找到手机，打开后屏幕亮起，干净，没有一条信息
            </div>
            <div>
              打开电脑，打开 github。pull request 写得很菜，collaborators
              都在喷你，但忽然就不孤独了
            </div>
          </Footer>
        </Layout>
      </Layout>
    );
  };

  render = () => {
    return <div className="MainPage">{this.generateMainPage()}</div>;
  };
}
