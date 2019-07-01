import React from 'react';
import { mount } from 'enzyme';
import MappingDetail from '../MappingDetail';
import 'nino-cli/scripts/setup';

const dataSource = {
  CanvasPosition: { x: -67, y: 230 },
  BlockGroup: {
    'block-623187': {
      x: 158,
      y: 256,
    },
    'block-624018': {
      x: 367,
      y: 368,
    },
    'block-73377': {
      x: 253,
      y: 525,
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

describe('MappingDetail', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <MappingDetail dataSource={dataSource} onSave={null} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
