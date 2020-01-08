import React from 'react';
import { mount, shallow } from 'enzyme';
import Uploader from '../Uploader';

describe('Uploader', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fileList = [
    { id: 1, url: 'test1', error: false, name: 'test1' },
    { id: 2, url: 'test2', error: false, name: 'test2' },
  ];

  it('onChange', done => {
    const onChange = jest.fn();
    const wrapper: any = shallow(<Uploader fileList={fileList} onChange={onChange} />);
    const blob = new Blob(['This is my firt trip to an island'], {
      type: 'text/plain',
    });
    const file = new File([blob], 'test');
    wrapper
      .find('input')
      .props()
      .onChange({ target: { files: [file] } }, () => {
        expect(onChange).toHaveBeenCalled();
        done();
      });
  });
});
