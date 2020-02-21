import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const UtilWrapper = lazy(() => import('../controller/UtilWrapper') as any);

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <UtilWrapper />
  </Suspense>,
  document.getElementById('root'),
);
