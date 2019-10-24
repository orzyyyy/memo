import React from 'react';
import { mount } from 'enzyme';
import MarkdownEditor from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const onSave = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(<MarkdownEditor onSave={onSave} onChange={onChange} value="- test" />);
    expect(wrapper).toMatchSnapshot();
  });
});
