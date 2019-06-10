import React from 'react';
import { mount } from 'enzyme';
import MarkdownEditor from '../MarkdownEditor';
import 'nino-cli/scripts/setup';

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

  it('onSave, onChange works', () => {
    const onSave = jest.fn();
    const wrapper = mount(
      <MarkdownEditor
        targetId="targetId"
        dataSource={'testDataSource'}
        onSave={onSave}
      />,
    );
    wrapper
      .find('Button')
      .props()
      .onClick();
    expect(onSave).toHaveBeenCalled();
    wrapper
      .find('TextArea')
      .props()
      .onChange({ target: { value: 'test' } });
    expect(wrapper.state().textareaValue).toBe('test');
  });
});
