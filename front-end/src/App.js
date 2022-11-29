import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/customer/products" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
