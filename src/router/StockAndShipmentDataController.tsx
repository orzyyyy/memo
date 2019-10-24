import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const StockAndShipmentDataController = lazy(() => import('../controller/StockAndShipmentDataController'));

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <StockAndShipmentDataController />
  </Suspense>,
  document.getElementById('root'),
);
