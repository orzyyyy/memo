import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const MappingDetailDataController = lazy(() => import('../controller/MappingDetailDataController'));

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <MappingDetailDataController />
  </Suspense>,
  document.getElementById('root'),
);
