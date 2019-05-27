import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetail = lazy(() => import('./pages/MappingDetail'));
const MarkdownEditor = lazy(() => import('./pages/MarkdownEditor'));

export default () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetail} />
        <Route path="/markdown/edit/:id" component={MarkdownEditor} />
      </Switch>
    </Suspense>
  </Router>
);
