import React, { Component } from 'react';
import '../assets/MainPage.css';
import { ajax } from '../urlHelper';
import { Card, Dropdown, Menu } from 'antd';
import classNames from 'classnames';

export default class MainPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    ajax({
      url: 'dist/mapping.json',
      success: data => this.setState({ data }),
    });
  };

  handleClick = ({ id }) => {
    // eslint-disable-next-line
    console.log(id);
  };

  render = () => {
    const { data } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">修改</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>
      </Menu>
    );

    return (
      <div className="MainPage">
        {data.map(item => {
          const { thumbnailUrl, id, hoverText } = item;
          return (
            <Card.Grid className="card" key={id}>
              <Dropdown overlay={menu} trigger={['contextMenu']}>
                <img
                  src={thumbnailUrl}
                  onClick={() => this.handleClick(item)}
                />
              </Dropdown>
            </Card.Grid>
          );
        })}
      </div>
    );
  };
}
