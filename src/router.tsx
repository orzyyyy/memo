<<<<<<< HEAD
import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
=======
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
>>>>>>> feat: replace HashRouter with BrowserRouter
import TohoLoading from './pages/TohoLoading';
const MainPage = lazy(() => import('./controller/MainPageDataController'));
const MappingDetailDataController = lazy(() =>
  import('./controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./controller/MarkdownEditorDataController'),
);

<<<<<<< HEAD
export default () => (
  <HashRouter>
    <Suspense fallback={<TohoLoading />}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownEditorDataController} />
      </Switch>
    </Suspense>
  </HashRouter>
);
=======
const bindSocket = () => {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
};

export default class Router extends Component {
  componentDidMount() {
    fetch('/test')
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error();
      })
      .then(() => {
        bindSocket();
      })
      .catch();
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<TohoLoading />}>
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route
              path="/mapping/:id"
              component={MappingDetailDataController}
            />
            <Route
              path="/markdown/edit/:id"
              component={MarkdownEditorDataController}
            />
            <Route
              path="/markdown/:id"
              component={MarkdownEditorDataController}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
>>>>>>> feat: replace HashRouter with BrowserRouter
