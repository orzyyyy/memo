import React from 'react';
import { commonStyle } from '../commonStyle';
import './select.css';

const Select = ({ style, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select style={Object.assign({}, commonStyle, style)} {...rest}>
    {children}
  </select>
);

export default Select;
