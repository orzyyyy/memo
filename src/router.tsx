import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages";
import MappingDetail from "./pages/mapping";
import mapping from "./mapping.json";

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
      </Router>
    );
  };
}
