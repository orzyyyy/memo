import React, { Component } from 'react';
import '../assets/MainPage.css';
import { ajax } from '../urlHelper';
import { Card, Dropdown, Menu, Icon } from 'antd';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.getMapping();
  };

  getMapping = () => {
    ajax({
      url: 'dist/mapping.json',
      success: data => this.setState({ data }),
    });
  };

  handleClick = ({ id }) => {
    location.hash = `/${id}`;
  };

  handleDelete = ({ id }) => {
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
          DataCollector.clear();
          this.getMapping();
        }
      },
    });
  };

  handleAdd = () => {
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

  generateMainPage = () => {
    const { data } = this.state;

    if (data.length == 0) {
      return (
        <Card.Grid className="card add" onClick={this.handleAdd}>
          <Icon type="plus" />
        </Card.Grid>
      );
    }
    return (
      <>
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
            <React.Fragment key={`fragment-${id}`}>
              <Card.Grid className="card">
                <Dropdown overlay={menu} trigger={['contextMenu']}>
                  <img
                    src={thumbnailUrl}
                    onClick={() => this.handleClick(item)}
                  />
                </Dropdown>
              </Card.Grid>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  render = () => {
    return <div className="MainPage">{this.generateMainPage()}</div>;
  };
}
