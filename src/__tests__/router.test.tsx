import React from 'react';
import { shallow } from 'enzyme';
import Router from '../router';
import mapping from '../mapping.json';
import 'nino-cli/scripts/setup';

describe('Router', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper.find('Route').length).toBe(mapping.length + 2);
  });
});
