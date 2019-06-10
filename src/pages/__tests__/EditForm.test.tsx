import React from 'react';
import { mount } from 'enzyme';
import EditForm from '../EditForm';
import 'nino-cli/scripts/setup';
import { SiderProps } from '../../controller/MainPageDataController';

const menuData = [
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
const dataItem = {
  title: 'testTitle',
  category: 'markdown',
  type: 'testType',
  subType: 'testSubType',
};
function noop() {}

describe('EditForm', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <EditForm
        visible
        selectData={menuData as SiderProps[]}
        onSubmit={noop}
        onCancel={noop}
        loading={false}
        dataItem={dataItem}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
