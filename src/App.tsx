import React, { useState, useEffect } from 'react';
import Socket from './third-party/socket';
import Chat from './components/chat';
// import './App.css';

const App: React.FC = () => {
  const [ username, setUsername ] = useState('');
  const [ isLogged, setIsLogged ] = useState(false);

  useEffect(() => {
    Socket.emit('connected', 'Hello from the other side');

  }, [])

  const logIn = (e: React.FormEvent ) => {
    e.preventDefault();
    if (username !== '') {
      setIsLogged(true);
    }
  };

  return (
    <div className="app">
      <div>Hola</div>
      {
        !isLogged
        ?
        <form onSubmit={ logIn }>
          <label>What's your username?</label>
          <input value={ username } onChange={e => setUsername(e.target.value) } />
          <button>Go to the chat!</button>
        </form>
        :
        <Chat username={ username } />
      }
    </div>
  );
}

export default App;
