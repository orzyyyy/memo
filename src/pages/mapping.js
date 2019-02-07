import React, { Component } from 'react';
import '../assets/mapping.css';
import { ajax } from '../urlHelper';
import { Canvas, Toolbar } from 'mini-xmind';
import { message } from 'antd';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default class Mapping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount = () => {
    this.bindKeyDown();
    this.getMapping();
  };

  bindKeyDown = () => {
    document.onkeydown = e => {
      e.preventDefault();
      const { ctrlKey, keyCode } = e;

      // ctrl + s
      if (ctrlKey && keyCode === 83) {
        const data = DataCollector.getAll();
        this.send(data);
      } else {
        e.stopPropagation();
      }
    };
  };

  send = data => {
    const id = this.getMappingId();
    ajax({
      url: 'save',
      params: {
        method: 'POST',
        body: JSON.stringify({ layout: data, id }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      },
      success: result => {
        if (!result) {
          message.error('error with save');
        } else {
          location.reload();
          // this.getMapping();
        }
      },
    });
  };

  getMapping = () => {
    const id = this.getMappingId();

    ajax({
      url: `dist/layout/${id}.json`,
      success: data => {
        const date = format(new Date(), 'a HH:mm:ss', {
          locale: zhCN,
        });
        message.success(`更新时间：${date}`);
        this.setState({ data });
      },
    });
  };

  getMappingId = () => {
    const hash = location.hash.split('/');
    const param = hash[hash.length - 1];
    if (param.includes('?')) {
      const search = param.split('?');
      return search[search.length - 1];
    }
    return param;
  };

  render = () => {
    const { data } = this.state;
    return (
      <div className="mapping">
        <Toolbar />
        <Canvas data={data} className="canvas-wrapper" orientation="v" />
      </div>
    );
  };
}
