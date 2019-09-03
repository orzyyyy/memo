import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TohoLoading from './pages/TohoLoading';
const MainPageDataController = lazy(() =>
  import('./controller/MainPageDataController'),
);
const MappingDetailDataController = lazy(() =>
  import('./controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./controller/MarkdownEditorDataController'),
);
const MarkdownDetailDataController = lazy(() =>
  import('./controller/MarkdownDetailDataController'),
);

const Router = () => (
  <HashRouter>
    <Suspense fallback={<TohoLoading />}>
      <Switch>
        <Route path="/" component={MainPageDataController} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownDetailDataController} />
      </Switch>
    </Suspense>
  </HashRouter>
);

export default Router;
