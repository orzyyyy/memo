import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetail = lazy(() => import('./pages/MappingDetail'));
// const MarkdownEditor = lazy(() => import('./pages/MarkdownEditor'));
const MarkdownEditorDataController = lazy(() =>
  import('./pages/MarkdownEditorDataController'),
);

export default () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetail} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownEditorDataController} />
      </Switch>
    </Suspense>
  </Router>
);
