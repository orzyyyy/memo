import React from 'react';
import { mount } from 'enzyme';
import MarkdownEditor from '../MarkdownEditor';

describe('MarkdownEditor', () => {
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
