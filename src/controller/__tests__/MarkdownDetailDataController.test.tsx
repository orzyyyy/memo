import React from 'react';
import { mount } from 'enzyme';
import MarkdownDetailDataController from '../MarkdownDetailDataController';
import fetchMock from 'fetch-mock';

describe('MarkdownDetailDataController', () => {
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

  it('handleOnSave', async () => {
    const wrapper = mount(<MarkdownDetailDataController />);
    await wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
