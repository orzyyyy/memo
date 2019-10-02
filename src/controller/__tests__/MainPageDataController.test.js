import React from 'react';
import { mount } from 'enzyme';
import MainPageDataController from '../MainPageDataController';
import fetchMock from 'fetch-mock';
import mapping from '../../assets/mapping.json';
import sider from '../../assets/sider.json';

describe('MainPageDataController', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const exhentaiDetailArr = [
    {
      detailUrl: 'https://exhentai.org/g/1493342/278bdf2507/',
      postTime: 1569860220000,
      thumbnailUrl:
        'https://exhentai.org/t/29/84/2984094f1b827a2043793e12cab7c102b1a088a0-4534956-2122-3000-jpg_250.jpg',
    },
  ];

  beforeAll(() => {
    global.window.__isLocal = true;
  });

  beforeEach(() => {
    fetchMock.mock('./assets/mapping.json', mapping);
    fetchMock.mock('./assets/sider.json', sider);
    fetchMock.mock('/exhentai/dateSet', ['20190624084116', '20190624111055']);
    fetchMock.mock('./assets/exhentai/20190624084116.json', exhentaiDetailArr);
    fetchMock.mock('./assets/exhentai/20190624111055.json', exhentaiDetailArr);
    fetchMock.mock('/document/delete', {});
  });

  afterAll(() => {
    errorSpy.mockRestore();
    global.window.__isLocal = undefined;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetch data correctly locally', done => {
    const wrapper = mount(<MainPageDataController />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('MainPage').props().menuData).toEqual(sider);
      done();
    });
  });

  it('handleDelete', () => {
    const wrapper = mount(<MainPageDataController />);
    wrapper
      .find('MainPageList')
      .props()
      .onDelete({ id: 'test', category: 'markdown' });
    expect(errorSpy).toHaveBeenCalled();
  });
});
