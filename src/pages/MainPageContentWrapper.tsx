import React from 'react';
import './css/main-page-content-wrapper.css';

export interface MainPageContentWrapperProps {
  children?: React.ReactElement;
  height: number;
}

const MainPageContentWrapper = (props: MainPageContentWrapperProps) => {
  return (
    <main style={{ height: props.height }} className="main-page-content-wrapper">
      {props.children}
    </main>
  );
};

export default MainPageContentWrapper;
