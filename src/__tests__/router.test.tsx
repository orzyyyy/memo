import React from 'react';
import { shallow } from 'enzyme';
import Router from '../router';
import 'nino-cli/scripts/setup';

describe('Router', () => {
  it('render correctly', () => {
    expect(shallow(<Router />)).toMatchSnapshot();
  });
});
