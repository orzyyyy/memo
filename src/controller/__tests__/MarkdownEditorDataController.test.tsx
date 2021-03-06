import React from 'react';
import { mount } from 'enzyme';
import MarkdownEditorDataController from '../MarkdownEditorDataController';
import fetchMock from 'fetch-mock';

describe('MarkdownEditorDataController', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    fetchMock.mock('/api/memo/document/update', {});
    fetchMock.mock('/markdown//.md', { test: 1 });
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('render correctly', async () => {
    const wrapper = mount(<MarkdownEditorDataController />);
    await wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
