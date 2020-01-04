import React from 'react';
import { shallow, mount } from 'enzyme';
import MainPage from '../MainPage';

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

describe('MainPage', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const onEdit = jest.fn();
    const onExhentaiDownload = jest.fn();
    const onExhentaiSelectChange = jest.fn();
    const onExhentaiLoadList = jest.fn();
    const wrapper = shallow(
      <MainPage
        onEdit={onEdit}
        onExhentaiDownload={onExhentaiDownload}
        onExhentaiSelectChange={onExhentaiSelectChange}
        onExhentaiLoadList={onExhentaiLoadList}
        exhentaiDateSet={[]}
        menuData={menuData}
        siderSelectedKey="all"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
