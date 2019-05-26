import React, { Component } from 'react';
import './css/mapping.css';
import { Canvas, Toolbar } from 'mini-xmind';
import { message } from 'antd';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export interface MappingDetailState {
  data: any;
}

export default class MappingDetail extends Component<any, MappingDetailState> {
  state: MappingDetailState = {
    data: {},
  };

  componentDidMount = () => {
    this.bindKeyDown();
    this.getMapping();
  };

  bindKeyDown = () => {
    document.onkeydown = e => {
      const { ctrlKey, keyCode } = e;

      // ctrl + s
      if (ctrlKey && keyCode === 83) {
        e.preventDefault();
        this.send(this.state.data);
      } else {
        e.stopPropagation();
      }
    };
  };

  send = async (data: any) => {
    const id = this.getMappingId();
    const response = await fetch('/save/update', {
      method: 'POST',
      body: JSON.stringify({ layout: data, id }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    if (!result) {
      message.error('error with save');
    } else {
      // location.reload();
      this.getMapping();
    }
  };

  getMapping = async () => {
    const id = this.getMappingId();
    const response = await fetch(`assets/mapping/${id}.json`);
    const data = await response.json();
    const date = format(new Date(), 'a HH:mm:ss', {
      locale: zhCN,
    });
    message.success(`更新时间：${date}`);
    this.setState({ data });
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

  handleCanvasChange = (data: any) => this.setState({ data });

  render = () => {
    const { data } = this.state;
    return (
      <div className="mapping">
        <Toolbar />
        <Canvas
          data={data}
          className="canvas-wrapper"
          orientation="v"
          onChange={this.handleCanvasChange}
        />
      </div>
    );
  };
}
