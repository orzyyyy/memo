import React from 'react';
import { mount } from 'enzyme';
import MarkdownEditor from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const wrapper = mount(
      <MarkdownEditor
        targetId="targetId"
        dataSource={'testDataSource'}
        onSave={null}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
