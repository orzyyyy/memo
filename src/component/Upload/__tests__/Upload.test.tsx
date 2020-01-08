import React from 'react';
import { mount } from 'enzyme';
import Upload from '../Upload';

const fileList = [
  { id: '1', url: 'test1', error: false, name: 'test1' },
  { id: '2', url: 'test2', error: false, name: 'test2' },
];

describe('Upload', () => {
  it('render correctly', () => {
    const wrapper: any = mount(<Upload fileList={fileList} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should work correctly', () => {
    const onClick = jest.fn();
    const wrapper: any = mount(<Upload fileList={fileList} onClick={onClick} />);
    wrapper
      .find('.upload-item')
      .at(0)
      .simulate('click');
    expect(onClick).toBeCalledWith({ id: '1', url: 'test1', error: false, name: 'test1' });
  });

  it('status error should work correctly', () => {
    fileList[0].error = true;
    const wrapper: any = mount(<Upload fileList={fileList} />);
    expect(wrapper.find('.upload-item-error').length).toBe(1);
  });

  it('fileList should work correctly', () => {
    const wrapper: any = mount(<Upload fileList={fileList} />);
    wrapper.setProps({ fileList: [fileList[0]] });
    expect(wrapper.find('.upload-item').length).toBe(2);
  });
});
