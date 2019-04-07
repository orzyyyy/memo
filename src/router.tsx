import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPageDataController';
import MappingDetail from './pages/MappingDetail';
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
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/new" component={MappingDetail} />
          {mapping.map((item: MappingItem) => {
            const { id } = item;
            return <Route key={id} path={`/${id}`} component={MappingDetail} />;
          })}
        </Switch>
      </Router>
    );
  };
}
