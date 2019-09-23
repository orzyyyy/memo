import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import TohoLoading from '../pages/TohoLoading';

const MarkdownEditorDataController = lazy(() =>
  import('../controller/MarkdownEditorDataController'),
);

ReactDOM.render(
  <Suspense fallback={<TohoLoading />}>
    <MarkdownEditorDataController />
  </Suspense>,
  document.getElementById('root'),
);
