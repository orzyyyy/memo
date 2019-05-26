import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetail = lazy(() => import('./pages/MappingDetail'));
const MarkdownDetail = lazy(() => import('./pages/MarkdownDetail'));

export default () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetail} />
        <Route path="/markdown/:id" component={MarkdownDetail} />
      </Switch>
    </Suspense>
  </Router>
);
