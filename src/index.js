import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './pages';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<Demo />, MOUNT_NODE);

if (module.hot) {
  module.hot.accept();
}
