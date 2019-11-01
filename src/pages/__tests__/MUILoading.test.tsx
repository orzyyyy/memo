import React from 'react';
import { mount } from 'enzyme';
import MUILoading from '../MUILoading';

describe('MUILoading', () => {
  it('render correctly', () => {
    const wrapper = mount(<MUILoading />);
    expect(wrapper).toMatchSnapshot();
  });
});
