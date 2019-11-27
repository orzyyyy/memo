import React from 'react';
import { commonStyle } from './commonStyle';

const Select = ({ style, children, ...rest }: React.ButtonHTMLAttributes<HTMLSelectElement>) => (
  <select style={Object.assign({}, commonStyle, style)} {...rest}>
    {children}
  </select>
);

export default Select;
