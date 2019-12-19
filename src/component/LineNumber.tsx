import React from 'react';

export interface LineNumberProps {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactElement;
}

const LineNumber = ({ children }: LineNumberProps) => {
  return children;
};

export default LineNumber;
