import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Product from './pages/Product';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/Auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
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
    </AuthProvider>
  );
}

export default App;
