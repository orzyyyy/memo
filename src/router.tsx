import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TohoLoading from './pages/TohoLoading';
const MainPage = lazy(() => import('./controller/MainPageDataController'));
const MappingDetailDataController = lazy(() =>
  import('./controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./controller/MarkdownEditorDataController'),
);

export default () => (
  <BrowserRouter>
    <Suspense fallback={<TohoLoading />}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownEditorDataController} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
