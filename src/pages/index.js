import React, { Component } from 'react';
import '../assets/MainPage.css';
import { ajax } from '../urlHelper';
import { Card, Dropdown, Menu } from 'antd';

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
          this.getMapping();
        }
      },
    });
  };

  generateMainPage = () => {
    const { data } = this.state;
    return data.map(item => {
      const { thumbnailUrl, id, hoverText } = item;
      const menu = (
        <Menu>
          <Menu.Item key="update">修改</Menu.Item>
          <Menu.Item key="delete" onClick={() => this.handleDelete(item)}>
            删除
          </Menu.Item>
        </Menu>
      );
      return (
        <Card.Grid className="card" key={id}>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <img src={thumbnailUrl} onClick={() => this.handleClick(item)} />
          </Dropdown>
        </Card.Grid>
      );
    });
  };

  render = () => {
    return <div className="MainPage">this.generateMainPage()</div>;
  };
}
