import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages'));
const MappingDetail = lazy(() => import('./pages/mapping'));
import mapping from './mapping.json';

export default class Entry extends Component {
  render = () => {
    return (
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            <Route
              path="/"
              component={props => <MainPage {...props} />}
              exact
            />
            <Route
              path="/new"
              component={props => <MappingDetail {...props} />}
            />
            {mapping.map(item => {
              const { id } = item;
              return (
                <Route
                  key={id}
                  path={`/${id}`}
                  component={props => <MappingDetail {...props} />}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    );
  };
}
