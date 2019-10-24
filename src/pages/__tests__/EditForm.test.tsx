import React from 'react';
import { mount } from 'enzyme';
import EditForm from '../EditForm';

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
  id: '',
  title: 'testTitle',
  category: undefined,
  type: 'testType',
  subType: 'testSubType',
};
function noop() {}

describe('EditForm', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const wrapper = mount(
      <EditForm visible selectData={menuData} onSubmit={noop} onCancel={noop} loading={false} dataItem={dataItem} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onSubmit and onCancel works', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    const wrapper: any = mount(
      <EditForm
        visible
        selectData={menuData}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={false}
        dataItem={dataItem}
      />,
    );
    wrapper
      .find('#edit-form')
      .first()
      .props()
      .onFinish(dataItem, dataItem);
    expect(onSubmit).toHaveBeenCalled();
    wrapper
      .find('Modal')
      .props()
      .onCancel();
    expect(onCancel).toHaveBeenCalled();
  });

  it('empty dataItem', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    const wrapper = mount(
      <EditForm
        visible
        selectData={menuData}
        loading={false}
        onSubmit={onSubmit}
        onCancel={onCancel}
        dataItem={dataItem}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
