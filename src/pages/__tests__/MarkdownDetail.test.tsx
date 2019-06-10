import React from 'react';
import { mount } from 'enzyme';
import MarkdownDetail from '../MarkdownDetail';
import 'nino-cli/scripts/setup';

describe('MarkdownDetail', () => {
  it('render correctly', () => {
    const wrapper = mount(<MarkdownDetail dataSource={'- test'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
