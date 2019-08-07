import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import TohoLoading from './pages/TohoLoading';
import { createBrowserHistory } from 'history';
const MainPage = lazy(() => import('./controller/MainPageDataController'));
const MappingDetailDataController = lazy(() =>
  import('./controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./controller/MarkdownEditorDataController'),
);
export const history = createBrowserHistory();

export default () => (
  <BrowserRouter>
    <Suspense fallback={<TohoLoading />}>
      <Router history={history}>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownEditorDataController} />
      </Router>
    </Suspense>
  </BrowserRouter>
);
