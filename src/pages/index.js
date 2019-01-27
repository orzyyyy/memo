import React, { Component } from 'react';
import '../assets/demo.css';
import { ajax } from '../urlHelper';
import { Card, Tooltip } from 'antd';

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
      url: 'dist/lib/main/mapping.json',
      success: data => this.setState({ data }),
    });
  };

  render = () => {
    const { data } = this.state;
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };

    return (
      <div className="MainPage">
        {data.map(item => {
          const { thumbnailUrl, id, hoverText } = item;
          return (
            <Tooltip title={hoverText} key={id}>
              <Card.Grid style={gridStyle}>
                <img src={thumbnailUrl} />
              </Card.Grid>
            </Tooltip>
          );
        })}
      </div>
    );
  };
}
