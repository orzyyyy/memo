import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages'));
const MappingDetail = lazy(() => import('./pages/mapping'));
import mapping from './mapping.json';

export interface MappingItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  hoverText: string;
}

export default class Entry extends Component {
  render = () => {
    return (
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            <Route
              path="/"
              component={(props: any) => <MainPage {...props} />}
              exact
            />
            <Route
              path="/new"
              component={(props: any) => <MappingDetail {...props} />}
            />
            {mapping.map((item: MappingItem) => {
              const { id } = item;
              return (
                <Route
                  key={id}
                  path={`/${id}`}
                  component={(props: any) => <MappingDetail {...props} />}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    );
  };
}
