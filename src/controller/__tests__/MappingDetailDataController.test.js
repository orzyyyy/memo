import React from 'react';
import { mount } from 'enzyme';
import MappingDetailDataController from '../MappingDetailDataController';
import fetchMock from 'fetch-mock';

describe('MappingDetailDataController', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    fetchMock.mock('/document/update', {});
    fetchMock.mock('/mapping//.json', { test: 1 });
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('handleOnSave', async () => {
    const wrapper = mount(<MappingDetailDataController />);
    await wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});
