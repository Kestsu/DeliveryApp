import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/Auth/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Order from '../pages/Order';

function Routes() {
  const { isAuth, loading } = useContext(AuthContext);

  if (!isAuth && !loading) {
    return (
      <>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Redirect to="/login" />
      </>
    );
  }

  if (isAuth && !loading) {
    return (
      <>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />

        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/products/:idVenda" />
        <Route exact path="/customer/checkout" />

        <Route exact path="/seller/order" />
        <Route exact path="/seller/order/:id" component={ Order } />

        <Route exact path="/admin/manage" />
        {/* <Redirect to="/customer/products" /> */}
      </>
    );
  }

  return (
    <div>
      {loading && <p>loading...</p>}
    </div>
  );
}

export default Routes;
