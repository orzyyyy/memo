import React from 'react';
import { mount } from 'enzyme';
import EditForm from '../EditForm';
import 'nino-cli/scripts/setup';

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
        selectData={menuData}
        onSubmit={noop}
        onCancel={noop}
        loading={false}
        dataItem={dataItem}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onSubmit, onCancel, onSearch works', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    let form;
    const wrapper = mount(
      <EditForm
        visible
        selectData={menuData}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={false}
        dataItem={dataItem}
        wrappedComponentRef={ref => (form = ref)}
      />,
    );
    wrapper
      .find('Button')
      .at(1)
      .simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
    wrapper
      .find('Modal')
      .props()
      .onCancel();
    expect(onCancel).toHaveBeenCalled();
    wrapper
      .find('Select')
      .at(2)
      .props()
      .onSearch('testType');
    expect(form.state.extraTypeSelectItem).toBe('testType');
    wrapper
      .find('Select')
      .at(2)
      .props()
      .onChange('testTypeChange');
    expect(form.state.currentType).toBe('testTypeChange');
    wrapper
      .find('Select')
      .at(4)
      .props()
      .onSearch('testSubType');
    expect(form.state.extraSubTypeSelectItem).toBe('testSubType');
  });
});
