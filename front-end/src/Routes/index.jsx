import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import CustomerCheckout from '../pages/CustomerCheckout';
import Order from '../pages/Order';
import OrdersDetails from '../pages/OrdersDetails';

function Routes() {
  const { isAuth, loading } = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log('pathname', pathname);

  if (!loading) {
    return (
      <>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />

        {
          isAuth && (
            <>
              <Route exact path="/customer/products" component={ Products } />
              <Route exact path="/customer/products/:idVenda" />
              <Route exact path="/customer/checkout" component={ CustomerCheckout } />
              <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
              <Route exact path="/customer/orders" />

              <Route exact path="/seller/order" />
              <Route exact path="/seller/order/:id" component={ Order } />

              <Route exact path="/admin/manage" />
            </>
          )
        }

        {
          !isAuth && pathname !== '/register' && <Redirect to="/login" />
        }
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
