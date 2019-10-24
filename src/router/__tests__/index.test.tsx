import React from 'react';
import { mount } from 'enzyme';
import Entry from '..';

describe('entry of router', () => {
  beforeAll(() => {
    /* eslint-disable-next-line no-underscore-dangle */
    (global as any).window.__isLocal = true;

    const mountdNode = document.createElement('div');
    mountdNode.id = 'root';
    (global as any).document.body.append(mountdNode);
  });

  afterAll(() => {
    /* eslint-disable-next-line no-underscore-dangle */
    (global as any).window.__isLocal = undefined;
  });

  it('render correctly', () => {
    const wrapper = mount(<Entry />);
    expect(wrapper.find('BrowserRouter').length).toBe(1);
  });
});
