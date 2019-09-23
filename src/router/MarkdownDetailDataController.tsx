import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const MarkdownDetailDataController = lazy(() =>
  import('../controller/MarkdownDetailDataController'),
);

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <MarkdownDetailDataController />
  </Suspense>,
  document.getElementById('root'),
);
