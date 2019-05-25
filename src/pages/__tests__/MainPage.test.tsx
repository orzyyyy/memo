import React from 'react';
import { mount } from 'enzyme';
import MainPage from '../MainPage';
import menuData from '../../assets/sider.json';
import 'nino-cli/scripts/setup';

const dataSource = [
  {
    id: '1',
    title: 'test1',
    thumbnailUrl: 'assets/5795774_0.jpg',
    hoverText: 'test1',
  },
  {
    id: '2',
    title: 'test2',
    thumbnailUrl: 'assets/5795774_0.jpg',
    hoverText: 'test2',
  },
];

describe('MainPage', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <MainPage dataSource={dataSource} menuData={menuData} />,
    );
    expect(wrapper.find('img').length).toBe(2);
  });

  it('when dataSource is null, render add button correctly', () => {
    const wrapper = mount(<MainPage dataSource={[]} menuData={menuData} />);
    expect(wrapper.find('.card-grid-wrapper').length).toBe(1);
  });

  it('onSave works correctly', () => {
    const onSave = jest.fn();
    const wrapper = mount(
      <MainPage dataSource={dataSource} onSave={onSave} menuData={menuData} />,
    );
    wrapper
      .find('img')
      .at(0)
      .simulate('contextmenu');
    wrapper
      .find('.ant-dropdown-menu-item')
      .at(0)
      .simulate('click');
    expect(onSave).toBeCalled();
  });

  it('onSave works correctly when dataSource is null', () => {
    const onSave = jest.fn();
    const wrapper = mount(
      <MainPage dataSource={[]} onSave={onSave} menuData={menuData} />,
    );
    wrapper
      .find('.card-grid-wrapper')
      .at(0)
      .simulate('click');
    expect(onSave).toBeCalled();
  });

  it('onDelete works correctly', () => {
    const onDelete = jest.fn();
    const wrapper = mount(
      <MainPage
        dataSource={dataSource}
        onDelete={onDelete}
        menuData={menuData}
      />,
    );
    wrapper
      .find('img')
      .at(0)
      .simulate('contextmenu');
    wrapper
      .find('.ant-dropdown-menu-item')
      .at(1)
      .simulate('click');
    expect(onDelete).toBeCalled();
  });
});
