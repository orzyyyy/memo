import React, { Component } from 'react';
import './css/mapping.css';
import { Canvas, Toolbar } from 'mini-xmind';

export interface MappingDetailProps {
  dataSource: any;
  onSave: (data: any) => void;
}
export interface MappingDetailState {
  dataSource: any;
}

export default class MappingDetail extends Component<
  MappingDetailProps,
  MappingDetailState
> {
  static getDerivedStateFromProps(
    prevProps: MappingDetailProps,
    prevState: MappingDetailState,
  ) {
    if (!Object.keys(prevState.dataSource).length) {
      return {
        dataSource: prevProps.dataSource,
      };
    }
    return {};
  }

  state: MappingDetailState = {
    dataSource: {},
  };

  componentDidMount = () => {
    this.bindKeyDown();
  };

  bindKeyDown = () => {
    document.onkeydown = e => {
      const { ctrlKey, keyCode } = e;

      // ctrl + s
      if (ctrlKey && keyCode === 83) {
        e.preventDefault();
        this.props.onSave(this.state.dataSource);
      } else {
        e.stopPropagation();
      }
    };
  };

  handleCanvasChange = (dataSource: any) => {
    dataSource = Object.assign(
      {
        CanvasPosition: { x: 0, y: 0, z: 0, gap: 1 },
        BlockGroup: {},
        TagGroup: {},
        LineGroup: {},
      },
      dataSource,
    );
    this.setState({ dataSource });
  };

  render = () => {
    const { dataSource } = this.state;
    return (
      <div className="mapping">
        <Toolbar />
        <Canvas
          data={dataSource}
          className="canvas-wrapper"
          orientation="v"
          onChange={this.handleCanvasChange}
        />
      </div>
    );
  };
}
