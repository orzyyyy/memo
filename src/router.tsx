import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetail = lazy(() => import('./pages/MappingDetail'));

export interface MappingItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  hoverText: string;
}

export default class Entry extends Component {
  state: { paths: Array<MappingItem> } = {
    paths: [],
  };

  componentDidMount = async () => {
    const response = await fetch('./mapping.json');
    const paths = await response.json();
    this.setState({ paths });
  };

  render = () => {
    const { paths } = this.state;
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={MainPage} exact paths={paths} />
            <Route path="/new" component={MappingDetail} />
            {paths.map((item: MappingItem) => {
              const { id } = item;
              return (
                <Route key={id} path={`/${id}`} component={MappingDetail} />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    );
  };
}
