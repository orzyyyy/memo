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

    const scrollWrapperInExhentaiList = document.createElement('div');
    scrollWrapperInExhentaiList.className = 'main-page-content-wrapper';
    global.document.body.append(scrollWrapperInExhentaiList);
  });

  beforeEach(() => {
    fetchMock.mock('./assets/mapping.json', mapping);
    fetchMock.mock('./assets/sider.json', sider);
    fetchMock.mock('/exhentai/dateSet', ['20190624084116', '20190624111055']);
    fetchMock.mock('./assets/exhentai/20190624084116.json', exhentaiDetailArr);
    fetchMock.mock('./assets/exhentai/20190624111055.json', exhentaiDetailArr);
    fetchMock.mock('/document/delete', {});
    fetchMock.mock('/document/update', {});
    fetchMock.mock('/document/add', 'test');
    fetchMock.mock('/document/hide', 'test');
    fetchMock.mock('/exhentai/download', 'success');
    fetchMock.mock('/exhentai', 'success');
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

      wrapper
        .find('MainPage')
        .props()
        .onMenuClick(['ex-hentai-module']);

      setTimeout(async () => {
        wrapper.update();
        expect(wrapper.find('ExHentaiList').props().dataSource).toEqual(
          exhentaiDetailArr,
        );

        let result = await wrapper
          .find('ExHentaiList')
          .props()
          .onDownload({ url: 'test' });
        expect(result).toBe('success');
        result = await wrapper
          .find('ExHentaiList')
          .props()
          .onDownload({ url: false });
        expect(result).toBe('failed');
        done();
      });
    });
  });

  it('handleSubmit - update - mapping', done => {
    const wrapper = mount(<MainPageDataController />);
    wrapper
      .find('EditForm')
      .props()
      .onSubmit({ category: 'mapping' }, { id: 'test' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/');
      done();
    });
  });

  it('handleSubmit - update - markdown', done => {
    const wrapper = mount(<MainPageDataController />);
    wrapper
      .find('EditForm')
      .props()
      .onSubmit({ category: 'markdown' }, { id: 'test' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/');
      done();
    });
  });

  it('handleSubmit - add - mapping', done => {
    const wrapper = mount(<MainPageDataController />);
    wrapper
      .find('EditForm')
      .props()
      .onSubmit({ category: 'mapping' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/');
      done();
    });
  });

  it('handleSubmit - add - markdown', done => {
    const wrapper = mount(<MainPageDataController />);
    wrapper
      .find('EditForm')
      .props()
      .onSubmit({ category: 'markdown' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/');
      done();
    });
  });

  it('handleDelete', async () => {
    const wrapper = mount(<MainPageDataController />);
    const result = await wrapper
      .find('MainPageList')
      .props()
      .onDelete({ id: 'test', category: 'markdown' });
    expect(result).toBe(undefined);
  });

  it('handleEdit', async () => {
    const wrapper = mount(<MainPageDataController />);
    const result = await wrapper
      .find('MainPageList')
      .props()
      .onEdit();
    expect(result).toBe(undefined);
  });

  it('handleHide', async () => {
    const wrapper = mount(<MainPageDataController />);
    const result = await wrapper
      .find('MainPageList')
      .props()
      .onHide({ id: 'test' });
    expect(result).toBe(undefined);
  });

  it('handleExhentaiDownload', async () => {
    const wrapper = mount(<MainPageDataController />);
    const result = await wrapper
      .find('MainPage')
      .props()
      .onExhentaiDownload({ target: { value: 'test' } });
    expect(result).toBe('success');
  });

  it('handleExhentaiLoadList', async () => {
    const wrapper = mount(<MainPageDataController />);
    const result = await wrapper
      .find('MainPage')
      .props()
      .onExhentaiLoadList();
    expect(result).toBe(undefined);
  });

  it('handleListItemClick', async () => {
    const wrapper = mount(<MainPageDataController />);
    await wrapper
      .find('MainPageList')
      .props()
      .onListItemClick({ id: 'test', category: 'markdown' });
    expect(location.pathname).toBe('/markdown/test');
  });
});
