import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

import TohoLoading from '../pages/TohoLoading';
const MainPageDataController = lazy(() =>
  import('../controller/MainPageDataController'),
);
const MappingDetailDataController = lazy(() =>
  import('../controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('../controller/MarkdownEditorDataController'),
);
const MarkdownDetailDataController = lazy(() =>
  import('../controller/MarkdownDetailDataController'),
);

const bindSocket = () => {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
};

// eslint-disable-next-line no-underscore-dangle
(window as any).__isLocal && bindSocket();

const RouterInstance = () => (
  <BrowserRouter>
    <Suspense fallback={<TohoLoading />}>
      <Router history={history}>
        <Route path="/" component={MainPageDataController} exact />
        <Route path="/memo" component={MainPageDataController} />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownDetailDataController} />
      </Router>
    </Suspense>
  </BrowserRouter>
);

export default RouterInstance;
