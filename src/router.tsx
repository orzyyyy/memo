import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetail = lazy(() => import('./pages/MappingDetail'));
import { MappingProps } from '../server/controller/save';

export default class Entry extends Component {
  state: { paths: MappingProps[] } = {
    paths: [],
  };

  componentDidMount = async () => {
    const response = await fetch('./assets/mapping.json');
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
            {paths.map((item: MappingProps) => {
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
