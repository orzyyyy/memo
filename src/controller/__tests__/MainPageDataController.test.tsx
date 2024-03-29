import React from 'react';
import { mount } from 'enzyme';
import MainPageDataController from '../MainPageDataController';
import fetchMock from 'fetch-mock';
const mapping = require('../../assets/mapping.json');
const sider = require('../../assets/sider.json');

const originConfirm = window.confirm;

describe('MainPageDataController', () => {
  beforeEach(() => {
    window.confirm = () => true;
  });

  afterEach(() => {
    window.confirm = originConfirm;
  });

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
    /* eslint-disable-next-line no-underscore-dangle */
    (window as any).__isLocal = true;
    const scrollWrapperInExhentaiList = document.createElement('div');
    scrollWrapperInExhentaiList.className = 'main-page-content-wrapper';
    (window as any).document.body.append(scrollWrapperInExhentaiList);
  });

  beforeEach(() => {
    const prefix = '/api/memo';
    fetchMock.mock('./assets/mapping.json', mapping);
    fetchMock.mock('./assets/sider.json', sider);
    fetchMock.mock(prefix + '/exhentai/dateSet', ['20190624084116', '20190624111055']);
    fetchMock.mock('./assets/exhentai/20190624084116.json', exhentaiDetailArr);
    fetchMock.mock('./assets/exhentai/20190624111055.json', exhentaiDetailArr);
    fetchMock.mock(prefix + '/document/delete', {});
    fetchMock.mock(prefix + '/document/update/mapping', 'success');
    fetchMock.mock(prefix + '/document/update/content', 'content');
    fetchMock.mock(prefix + '/document/add', 'test');
    fetchMock.mock(prefix + '/document/hide', 'test');
    fetchMock.mock(prefix + '/exhentai/download', 'success');
    fetchMock.mock(prefix + '/exhentai/list/latest', 'success');
    fetchMock.mock(prefix + '/exhentai/list/oldest', 'success');
  });

  afterAll(() => {
    errorSpy.mockRestore();
    (window as any).__isLocal = undefined;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('handleSubmit - update - mapping', done => {
    const wrapper: any = mount(<MainPageDataController />);
    wrapper.find('EditForm').props().onSubmit({ category: 'mapping' }, { id: 'test' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/mapping/test');
      done();
    });
  });

  it('handleSubmit - update - markdown', done => {
    const wrapper: any = mount(<MainPageDataController />);
    wrapper.find('EditForm').props().onSubmit({ category: 'markdown' }, { id: 'test' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/markdown-editor/test');
      done();
    });
  });

  it('handleSubmit - add - mapping', done => {
    const wrapper: any = mount(<MainPageDataController />);
    wrapper.find('EditForm').props().onSubmit({ category: 'mapping' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/mapping/test');
      done();
    });
  });

  it('handleSubmit - add - markdown', done => {
    const wrapper: any = mount(<MainPageDataController />);
    wrapper.find('EditForm').props().onSubmit({ category: 'markdown' });
    setTimeout(() => {
      wrapper.update();
      expect(location.href).toBe('http://localhost/markdown-editor/test');
      done();
    });
  });

  it('handleDelete', async () => {
    const wrapper: any = mount(<MainPageDataController />);
    const result = await wrapper.find('MainPageList').props().onDelete({ id: 'test', category: 'markdown' });
    expect(result).toBe(undefined);
  });

  it('handleEdit', async () => {
    const wrapper: any = mount(<MainPageDataController />);
    const result = await wrapper.find('MainPageList').props().onEdit();
    expect(result).toBe(undefined);
  });

  it('handleHide', async () => {
    const wrapper: any = mount(<MainPageDataController />);
    const result = await wrapper.find('MainPageList').props().onHide({ id: 'test' });
    expect(result).toBe(undefined);
  });

  it('handleListItemClick', async () => {
    const wrapper: any = mount(<MainPageDataController />);
    await wrapper.find('MainPageList').props().onListItemClick({ id: 'test', category: 'markdown' });
    expect(location.pathname).toBe('/markdown-editor/test');
  });
});
