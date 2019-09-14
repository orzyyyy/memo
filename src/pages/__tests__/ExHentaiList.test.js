import React from 'react';
import { shallow } from 'enzyme';
import ExHentaiList from '../ExHentaiList';

describe('ExHentaiList', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const wrapper = shallow(
      <ExHentaiList
        dataSource={[
          {
            name:
              '[Zakotsu] Amanita Pantherina (COMIC Koh 2018-06) [Chinese] [嗷呜个人汉化] [Digital]',
            detailUrl: 'https://exhentai.org/g/1430261/17651c12eb/',
            postTime: 1559412420000,
            thumbnailUrl:
              'https://exhentai.org/t/5b/47/5b47c48abf0fb6c685869520cdb8ab0d97990e4d-1074410-1280-1807-jpg_250.jpg',
          },
        ]}
        wrapperHeight={1000}
        onDownload={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
