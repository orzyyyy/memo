import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  MOUNT_NODE,
);
