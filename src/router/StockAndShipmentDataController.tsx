import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';
import { bindSocket } from '.';

const StockAndShipmentDataController = lazy(() => import('../controller/StockAndShipmentDataController'));

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__isLocal && bindSocket();
  }, []);

  return (
    <Suspense fallback={<TohoLoading />}>
      <StockAndShipmentDataController />
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
