import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import IO from 'socket.io-client';

const MOUNT_NODE = document.getElementById('root');

const socket = IO('http://localhost:9099');
socket.on('refresh', () => {
  location.reload();
});

ReactDOM.render(<App />, MOUNT_NODE);
