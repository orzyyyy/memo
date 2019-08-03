import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';

const MOUNT_NODE = document.getElementById('root');

if (process.env.BUILD_ENV !== 'prod') {
  import('socket.io-client').then(target => {
    const socket = target.default('http://localhost:9099');
    socket.on('refresh', () => {
      location.reload();
    });
  });
}

ReactDOM.render(<App />, MOUNT_NODE);
