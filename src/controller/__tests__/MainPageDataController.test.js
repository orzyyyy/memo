import React from 'react';
import { mount } from 'enzyme';
import MainPageDataController from '../MainPageDataController';
import fetchMock from 'fetch-mock';

describe('MainPageDataController', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetch data', () => {
    fetchMock.mock('./assets/mapping.json', {});
    mount(<MainPageDataController />);
  });
});
