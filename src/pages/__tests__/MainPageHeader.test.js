import React from 'react';
import { shallow, mount } from 'enzyme';
import { Layout } from 'antd';
const Header = Layout.Header;
import MainPageHeader from '../MainPageHeader';

describe('MainPageHeader', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const wrapper = shallow(
      <MainPageHeader Header={Header} exhentaiDateSet={[]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onEdit of init button works correctly', () => {
    const onEdit = jest.fn();
    const wrapper = mount(
      <MainPageHeader onEdit={onEdit} Header={Header} exhentaiDateSet={[]} />,
    );
    wrapper
      .find('Button')
      .at(1)
      .props()
      .onClick();
    expect(onEdit).toHaveBeenCalled();
  });
});
