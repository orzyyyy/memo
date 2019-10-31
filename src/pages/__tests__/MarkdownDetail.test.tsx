import React from 'react';
import { mount } from 'enzyme';
import MarkdownDetail from '../MarkdownDetail';

describe('MarkdownDetail', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const wrapper = mount(<MarkdownDetail dataSource="<ul><li>test</li></ul>" />);
    expect(wrapper).toMatchSnapshot();
  });
});
