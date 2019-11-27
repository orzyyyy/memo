import React from 'react';
import { commonStyle } from './commonStyle';

const Input = ({ style, children, ...rest }: React.ButtonHTMLAttributes<HTMLInputElement>) => (
  <input style={Object.assign({}, commonStyle, style)} {...rest}>
    {children}
  </input>
);

export default Input;
