import React from 'react';
import { mount } from 'enzyme';
import Entry from '..';

describe('entry of router', () => {
  beforeAll(() => {
    global.window.__isLocal = true;

    const mountdNode = document.createElement('div');
    mountdNode.id = 'root';
    global.document.body.append(mountdNode);
  });

  afterAll(() => {
    global.window.__isLocal = undefined;
  });

  it('render correctly', () => {
    const wrapper = mount(<Entry />);
    expect(wrapper.find('BrowserRouter').length).toBe(1);
  });
});
