import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../MainPage';
import 'nino-cli/scripts/setup';
import { MappingProps } from '../../../server/controller/save';
const menuData = [
  {
    key: 'all',
    title: 'all',
  },
  {
    key: '读书',
    title: '读书',
    children: [
      {
        key: '摘抄',
        value: '摘抄',
      },
      {
        key: '思路',
        value: '思路',
      },
    ],
  },
];
const dataSource = [
  {
    id: '32e89f38116080d6b7608cf2137f3c96',
    title: '音程表',
    url: './assets/mapping/32e89f38116080d6b7608cf2137f3c96.json',
    createTime: 1559522075108,
    modifyTime: 1559523700429,
    type: '音乐',
    subType: '乐理',
    category: 'markdown',
  },
  {
    id: '7a73d21c13f1eb55053d4af66e0d057b',
    title: 'windows 下安装 rust',
    url: './assets/mapping/7a73d21c13f1eb55053d4af66e0d057b.json',
    createTime: 1559617097664,
    modifyTime: 1559633639037,
    type: 'Rust',
    subType: '安装',
    category: 'markdown',
  },
];

describe('MainPage', () => {
  it('render correctly', () => {
    const wrapper = shallow(
      <MainPage
        dataSource={dataSource as MappingProps[]}
        menuData={menuData}
        onEdit={null}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
