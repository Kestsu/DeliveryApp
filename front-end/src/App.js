import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Product from './pages/Product';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />

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
