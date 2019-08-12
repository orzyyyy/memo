import React from 'react';
import { shallow, mount } from 'enzyme';
import { Layout } from 'antd';
const Header = Layout.Header;
import MainPageHeader from '../MainPageHeader';

describe('MainPageHeader', () => {
  it('render correctly', () => {
    const wrapper = shallow(<MainPageHeader Header={Header} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onEdit of init button works correctly', () => {
    const onEdit = jest.fn();
    const wrapper = mount(<MainPageHeader onEdit={onEdit} Header={Header} />);
    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
    expect(onEdit).toHaveBeenCalled();
  });
});
