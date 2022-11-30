import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/Auth/AuthContext';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Routes />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
