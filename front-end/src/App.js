import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/Auth/AuthContext';
import Routes from './Routes';

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Routes />
      </Switch>
    </AuthProvider>
  );
}

export default App;
