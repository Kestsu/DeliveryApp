import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Product from './pages/Product';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" />
        <Route exact path="/register" />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/products/:id" component={ Product } />
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
