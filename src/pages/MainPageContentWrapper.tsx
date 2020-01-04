import React from 'react';

export interface MainPageContentWrapperProps {
  children?: React.ReactElement;
  height: number;
}

const MainPageContentWrapper = (props: MainPageContentWrapperProps) => (
  <main style={{ height: props.height, marginLeft: 8, overflow: 'auto' }} className="main-page-content-wrapper">
    {props.children}
  </main>
);

export default MainPageContentWrapper;
