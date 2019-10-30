import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

import TohoLoading from '../pages/TohoLoading';
const MainPageDataController = lazy(() => import('../controller/MainPageDataController'));
const MappingDetailDataController = lazy(() => import('../controller/MappingDetailDataController'));
const MarkdownEditorDataController = lazy(() => import('../controller/MarkdownEditorDataController'));
const MarkdownDetailDataController = lazy(() => import('../controller/MarkdownDetailDataController'));

const routes: { path: string; component: React.LazyExoticComponent<() => JSX.Element>; key: string }[] = [
  {
    path: '/',
    component: MainPageDataController,
    key: 'main-page',
  },
  { path: '/mapping/:id', component: MappingDetailDataController, key: 'mapping-detail' },
  { path: '/markdown/edit/:id', component: MarkdownEditorDataController, key: 'markdown-edit' },
  { path: '/markdown/:id', component: MarkdownDetailDataController, key: 'markdown-detail' },
];

export const bindSocket = () => {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
};

const RouterInstance = () => {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__isLocal && bindSocket();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<TohoLoading />}>
        <Router history={history}>
          {routes.map(({ path, component, key }) => (
            <React.Fragment key={key}>
              <Route path={path} component={component} exact />
              <Route path={'/memo' + path} component={component} exact />
            </React.Fragment>
          ))}
        </Router>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterInstance;
