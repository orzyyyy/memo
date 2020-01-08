import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const SlicingImage = lazy(() => import('../pages/SlicingImage'));

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <SlicingImage />
  </Suspense>,
  document.getElementById('root'),
);
