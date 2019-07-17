import React from 'react';
import { mount } from 'enzyme';
import MarkdownDetail from '../MarkdownDetail';

describe('MarkdownDetail', () => {
  it('render correctly', () => {
    const wrapper = mount(<MarkdownDetail dataSource={'- test'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
