import React, { Component } from 'react';
import '../assets/MainPage.css';
import { ajax } from '../urlHelper';
import { Card, Dropdown, Menu } from 'antd';

export default class MainPage extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      status: 'main', // main => MainPage, detail => mapping
      Detail: null,
      mappingId: '',
    };
  }

  componentDidMount = () => {
    ajax({
      url: 'dist/mapping.json',
      success: data => this.setState({ data }),
    });
  };

  handleClick = ({ id }) => {
    import('./mapping').then(target => {
      this.setState({
        Detail: target.default,
        status: 'detail',
        mappingId: id,
      });
    });
  };

  generateMainPage = () => {
    const { data } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">修改</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>
      </Menu>
    );
    return data.map(item => {
      const { thumbnailUrl, id, hoverText } = item;
      return (
        <Card.Grid className="card" key={id}>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <img src={thumbnailUrl} onClick={() => this.handleClick(item)} />
          </Dropdown>
        </Card.Grid>
      );
    });
  };

  generateDetail = () => {
    const { Detail, mappingId } = this.state;
    return Detail && <Detail id={mappingId} />;
  };

  render = () => {
    const { status } = this.state;
    return (
      <div className="MainPage">
        {status === 'main' && this.generateMainPage()}
        {status === 'detail' && this.generateDetail()}
      </div>
    );
  };
}
