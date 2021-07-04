import React, { useEffect } from 'react';
import socket from './third-party/socket';
// import './App.css';

function App() {

  useEffect(() => {
    socket.emit('connected', 'Hello from the other side');

  }, [])

  return (
    <div className="app">
      <div>Hola</div>
    </div>
  );
}

export default App;
