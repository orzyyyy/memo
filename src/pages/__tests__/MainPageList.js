import React from 'react';
import { mount } from 'enzyme';
import MainPageList from '../MainPageList';

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
    category: 'mapping',
  },
];

describe('MainPageList', () => {
  it('render correctly', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const props = {
      dataSource,
      onDelete,
      onEdit,
    };
    const state = {
      siderSelectedKey: 'all',
    };
    const handleListItemClick = jest.fn();
    const event = {
      handleListItemClick,
    };
    const wrapper = mount(
      <MainPageList props={props} state={state} event={event} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('events works correctly', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const props = {
      dataSource,
      onDelete,
      onEdit,
    };
    const state = {
      siderSelectedKey: 'all',
    };
    const handleListItemClick = jest.fn();
    const event = {
      handleListItemClick,
    };
    const wrapper = mount(
      <MainPageList props={props} state={state} event={event} />,
    );
    wrapper
      .find('Item')
      .first()
      .simulate('contextmenu');
    wrapper
      .find('.ant-dropdown-menu-item')
      .first()
      .props()
      .onClick();
    expect(onEdit).toHaveBeenCalled();
    wrapper
      .find('.ant-dropdown-menu-item')
      .last()
      .props()
      .onClick();
    expect(onDelete).toHaveBeenCalled();
    wrapper
      .find('Item')
      .first()
      .simulate('click');
    expect(handleListItemClick).toHaveBeenCalled();
  });
});
