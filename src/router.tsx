import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TohoLoading from './pages/TohoLoading';
const MainPageDataController = lazy(() =>
  import('./controller/MainPageDataController'),
);
const MappingDetailDataController = lazy(() =>
  import('./controller/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./controller/MarkdownEditorDataController'),
);
const MarkdownDetailDataController = lazy(() =>
  import('./controller/MarkdownDetailDataController'),
);

const checkLocalStatus = (callback?: () => void) => {
  fetch('/test')
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error();
    })
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch(() => {});
};

const bindSocket = () => {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
};

checkLocalStatus(() => {
  // eslint-disable-next-line no-underscore-dangle
  (window as any).__isLocal = true;
  bindSocket();
});

const Router = () => (
  <HashRouter>
    <Suspense fallback={<TohoLoading />}>
      <Switch>
        <Route path="/" component={MainPageDataController} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownDetailDataController} />
      </Switch>
    </Suspense>
  </HashRouter>
);

export default Router;
