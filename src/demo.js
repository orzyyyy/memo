import React, { Component } from 'react';
import Canvas from 'mini-xmind/dist/lib/canvas';
import Toolbar from 'mini-xmind/dist/lib/toolbar';
import './assets/demo.css';

export default class demo extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    const data = {
      BlockGroup: {
        'block-623187': {
          x: 158,
          y: 256,
          style: {
            width: 100,
            height: 80,
            background: '#F96',
            borderRadius: '10px',
            border: '1px solid #aaa',
          },
        },
        'block-624018': {
          x: 367,
          y: 368,
          style: {
            width: 100,
            height: 80,
            background: '#F96',
            borderRadius: '10px',
            border: '1px solid #aaa',
          },
        },
        'block-73377': {
          x: 253,
          y: 525,
          style: {
            width: 100,
            height: 80,
            background: '#F96',
            borderRadius: '10px',
            border: '1px solid #aaa',
          },
        },
      },
      TagGroup: {
        'tag-626505': {
          x: 167,
          y: 284,
          style: { width: 100, height: 32 },
          editable: false,
          input: 'test',
        },
        'tag-629962': {
          x: 405,
          y: 398,
          style: { width: 100, height: 32 },
          editable: false,
          input: 'test2',
        },
        'tag-80986': {
          x: 286,
          y: 555,
          style: { width: 100, height: 32 },
          editable: false,
          input: 'test3',
        },
      },
      LineGroup: {
        'line-77619': { fromKey: 'block-73377', toKey: 'block-623187' },
        'line-592694': { fromKey: 'block-623187', toKey: 'block-624018' },
      },
    };

    return (
      <div className="demo">
        <Toolbar />
        <Canvas data={data} />
      </div>
    );
  };
}
