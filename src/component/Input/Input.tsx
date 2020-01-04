import React from 'react';
import { commonStyle } from '../commonStyle';
import './input.css';

const Input = ({ style, children, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input style={Object.assign({}, commonStyle, style)} {...rest}>
    {children}
  </input>
);

export default Input;
