import React from 'react';
import { shallow, mount } from 'enzyme';
import MainPageHeader from '../MainPageHeader';

describe('MainPageHeader', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('render correctly', () => {
    const onEdit = jest.fn();
    const onExhentaiDownload = jest.fn();
    const onExhentaiSelectChange = jest.fn();
    const onExhentaiLoadList = jest.fn();
    const wrapper = shallow(
      <MainPageHeader
        onEdit={onEdit}
        onExhentaiDownload={onExhentaiDownload}
        onExhentaiSelectChange={onExhentaiSelectChange}
        onExhentaiLoadList={onExhentaiLoadList}
        exhentaiDateSet={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onEdit of init button works correctly', () => {
    const onEdit = jest.fn();
    const onExhentaiDownload = jest.fn();
    const onExhentaiSelectChange = jest.fn();
    const onExhentaiLoadList = jest.fn();
    const wrapper: any = mount(
      <MainPageHeader
        onEdit={onEdit}
        onExhentaiDownload={onExhentaiDownload}
        onExhentaiSelectChange={onExhentaiSelectChange}
        onExhentaiLoadList={onExhentaiLoadList}
        exhentaiDateSet={[]}
      />,
    );
    wrapper
      .find('Button')
      .at(1)
      .props()
      .onClick();
    expect(onEdit).toHaveBeenCalled();
  });
});
