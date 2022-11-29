import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" />
        <Route exact path="/register" />
        <Route exact path="/customer/products" />
        <Route exact path="/customer/products/:id" />
        <Route exact path="/customer/products/:idVenda" />
        <Route exact path="/customer/checkout" />

        <Route exact path="/seller/order" />
        <Route exact path="/seller/order/id" />

        <Route exact path="/admin/manage" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
